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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let PostGateway = class PostGateway {
    handleGetPost(post) {
        this.server.emit('getPost', post);
    }
    handleGetPostById(post) {
        this.server.emit('getPostById', post);
    }
    handlePostCreated(post) {
        this.server.emit('postCreated', post);
    }
    handlePostLiked(post) {
        this.server.emit('likedPost', post);
    }
    handlePostDisliked(post) {
        this.server.emit('dislikedPost', post);
    }
    handlePostAddComment(comment) {
        this.server.emit('addComment', comment);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PostGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostGateway.prototype, "handleGetPost", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostGateway.prototype, "handleGetPostById", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostGateway.prototype, "handlePostCreated", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostGateway.prototype, "handlePostLiked", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostGateway.prototype, "handlePostDisliked", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostGateway.prototype, "handlePostAddComment", null);
PostGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(8001, { cors: '*:*' })
], PostGateway);
exports.PostGateway = PostGateway;
//# sourceMappingURL=post.gateway.js.map