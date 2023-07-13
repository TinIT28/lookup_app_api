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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post-dto");
const update_post_dto_1 = require("./dto/update-post-dto");
const JwtGuard_1 = require("../auth/utils/JwtGuard");
const user_service_1 = require("../user/user.service");
const create_comment_dto_1 = require("../comment/dto/create-comment-dto");
let PostController = class PostController {
    constructor(postService, userService) {
        this.postService = postService;
        this.userService = userService;
    }
    async getAllPost(res, req) {
        try {
            const posts = await this.postService.getAll();
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async createPost(res, req, post) {
        try {
            const newPost = await this.postService.create(req.user._id, post);
            res.status(201).json(newPost);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getOwnerPost(res, req, userId) {
        try {
            const user = await this.postService.getUserDetail(userId);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updatePost(res, req, postId, post) {
        try {
            const newPost = await this.postService.update(postId, post, req.user.id);
            res.status(200).json(newPost);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async likePost(res, req, postId) {
        try {
            const newPost = await this.postService.likePost(postId, req.user._id);
            res.status(200).json(newPost);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async unlikePost(res, req, postId) {
        try {
            const newPost = await this.postService.unlikePost(postId, req.user._id);
            res.status(200).json(newPost);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getPost(res, postId) {
        try {
            const post = await this.postService.getPost(postId);
            res.status(200).json(post);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserPosts(res, userId) {
        try {
            const posts = await this.postService.getUserProfilePosts(userId);
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deletePost(res, req, postId) {
        try {
            const newPost = this.postService.delete(postId, req.user._id);
            res.status(200).json(newPost);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async addComment(res, req, postId, comment) {
        try {
            const foundPost = await this.postService.addComment(req.user._id, postId, comment);
            res.status(200).json(foundPost);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteComment(res, req, commentId) {
        try {
            const deletedComment = await this.postService.deleteComment(commentId, req.user._id);
            res.status(200).json(deletedComment);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserFeed(res, req) {
        try {
            const user = await this.userService.findUserById(req.user._id);
            user.followings.push(user.id);
            const posts = await this.postService.getUsersFeed(user.followings);
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPost", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('owner'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getOwnerPost", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Put)(':postId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('postId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)('like/like/:postId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likePost", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)('like/unlike/:postId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "unlikePost", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)('profile/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getUserPosts", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Delete)(':postId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)('comment/:postId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('postId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addComment", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Delete)('comment/:commentId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)('feed/get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getUserFeed", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        user_service_1.UserService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map