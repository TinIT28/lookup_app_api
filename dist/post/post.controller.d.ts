import { PostService } from './post.service';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { UserService } from 'src/user/user.service';
import { CreateCommentDto } from '../comment/dto/create-comment-dto';
export declare class PostController {
    private postService;
    private userService;
    constructor(postService: PostService, userService: UserService);
    getAllPost(res: Response, req: any): Promise<void>;
    createPost(res: Response, req: any, post: CreatePostDto): Promise<void>;
    getOwnerPost(res: Response, req: any, userId: string): Promise<void>;
    updatePost(res: Response, req: any, postId: string, post: UpdatePostDto): Promise<void>;
    likePost(res: Response, req: any, postId: string): Promise<void>;
    unlikePost(res: Response, req: any, postId: string): Promise<void>;
    getPost(res: Response, postId: string): Promise<void>;
    getUserPosts(res: Response, userId: string): Promise<void>;
    deletePost(res: Response, req: any, postId: string): Promise<void>;
    addComment(res: Response, req: any, postId: string, comment: CreateCommentDto): Promise<void>;
    deleteComment(res: Response, req: any, commentId: string): Promise<void>;
    getUserFeed(res: Response, req: any): Promise<void>;
}
