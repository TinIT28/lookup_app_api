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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./schema/comment.schema");
const mongoose_2 = require("mongoose");
let CommentService = class CommentService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async postComment(userId, comment) {
        try {
            let newComment = new this.commentModel(comment);
            newComment.author = userId;
            newComment = await newComment.save();
            return newComment;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteComment(commentId, userId) {
        try {
            const deletedComment = await this.commentModel.findOneAndDelete({
                _id: commentId,
                author: userId,
            });
            return deletedComment;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCommentByIds(commentIds) {
        try {
            const deleteComments = await this.commentModel.deleteMany()
                .where('_id')
                .in(commentIds)
                .exec();
        }
        catch (error) {
            throw error;
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map