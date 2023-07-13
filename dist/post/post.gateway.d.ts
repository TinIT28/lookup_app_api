import { Server } from 'socket.io';
export declare class PostGateway {
    server: Server;
    handleGetPost(post: any): void;
    handleGetPostById(post: any): void;
    handlePostCreated(post: any): void;
    handlePostLiked(post: any): void;
    handlePostDisliked(post: any): void;
    handlePostAddComment(comment: any): void;
}
