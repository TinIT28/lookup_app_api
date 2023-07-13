"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schema/post.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const comment_service_1 = require("../comment/comment.service");
const user_service_1 = require("../user/user.service");
const post_gateway_1 = require("./post.gateway");
let PostService = class PostService {
    constructor(postModel, cloudinaryService, commentService, userService, postGateway) {
        this.postModel = postModel;
        this.cloudinaryService = cloudinaryService;
        this.commentService = commentService;
        this.userService = userService;
        this.postGateway = postGateway;
    }
    async create(userId, post) {
        try {
            const newPost = new this.postModel(post);
            newPost.user = userId;
            if (newPost.images) {
                newPost.images = (await this.cloudinaryService.convertImagesCloudinary(newPost.images));
            }
            this.postGateway.handlePostCreated(newPost);
            return newPost.save();
        }
        catch (error) {
            throw error;
        }
    }
    async getUserDetail(userId) {
        const user = await this.userService.findUserNameById(userId);
        return user;
    }
    async getAll() {
        const posts = await this.postModel.find()
            .populate('user', 'name image')
            .sort({ createdAt: -1 });
        this.postGateway.handleGetPost(posts);
        return posts;
    }
    async getById(id) {
        const post = await this.postModel.findById(id).populate('comments', 'content').populate('user', 'name image');
        this.postGateway.handleGetPostById(post);
        return post;
    }
    async update(postId, post, userId) {
        try {
            const foundPost = await this.postModel.findOne({
                _id: postId,
                user: userId,
            });
            foundPost.content = post.content || foundPost.content;
            if (post.images && foundPost.images !== post.images) {
                foundPost.images = (await this.cloudinaryService.convertImagesCloudinary(post.images));
            }
            return await foundPost.save();
        }
        catch (error) {
            throw error;
        }
    }
    async delete(postId, userId) {
        try {
            const foundPost = await this.postModel.findById(postId);
            const deleteComments = this.commentService.deleteCommentByIds(foundPost.comments);
            const deletePost = await this.postModel.findOneAndDelete({
                _id: postId,
                user: userId,
            });
            return deletePost;
        }
        catch (error) {
            throw error;
        }
    }
    async likePost(postId, userId) {
        try {
            const foundPost = await this.postModel.findById(postId);
            if (!foundPost.likes.includes(userId)) {
                const updatedPost = await foundPost.updateOne({
                    $push: { likes: userId },
                });
                this.postGateway.handlePostLiked(updatedPost);
                return updatedPost;
            }
            else {
                throw Error('You already like post!');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async unlikePost(postId, userId) {
        try {
            const foundPost = await this.postModel.findById(postId);
            if (foundPost.likes.includes(userId)) {
                const updatedPost = await foundPost.updateOne({
                    $pull: { likes: userId },
                });
                const post = await this.postModel.findById(postId)
                    .populate('user')
                    .populate({
                    path: 'comments',
                    populate: 'user',
                });
                this.postGateway.handlePostDisliked(post);
                return post;
            }
            else {
                throw Error('You are already disliking this post!');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async addComment(userId, postId, comment) {
        try {
            const foundPost = await this.postModel.findById(postId);
            const newComment = await this.commentService.postComment(userId, comment);
            const updatedPost = await foundPost.updateOne({
                $push: { comments: newComment._id }
            });
            this.postGateway.handlePostAddComment(newComment);
            return newComment;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteComment(commentId, userId) {
        try {
            const deletedComment = await this.commentService.deleteComment(commentId, userId);
            return deletedComment;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserProfilePosts(userId) {
        try {
            const posts = await this.postModel.find({ user: userId })
                .populate('user')
                .populate({
                path: 'comments',
                populate: 'author',
            })
                .sort({ createdAt: -1 })
                .exec();
            return posts;
        }
        catch (error) {
            throw error;
        }
    }
    async getPost(postId) {
        try {
            const post = await this.postModel.findById(postId)
                .populate('user')
                .populate({
                path: 'comments',
                populate: 'author'
            });
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    async getUsersFeed(userIds) {
        try {
            const posts = await this.postModel.find()
                .where('user')
                .in(userIds)
                .populate('user')
                .populate({
                path: 'comments',
                populate: 'author'
            })
                .sort({ createdAt: -1 })
                .exec();
            return posts;
        }
        catch (error) {
            throw error;
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Posts.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, cloudinary_service_1.CloudinaryService,
        comment_service_1.CommentService,
        user_service_1.UserService,
        post_gateway_1.PostGateway])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map