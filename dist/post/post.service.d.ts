import mongoose, { ObjectId } from 'mongoose';
import { Posts } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CommentService } from 'src/comment/comment.service';
import { UserService } from '../user/user.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment-dto';
import { PostGateway } from './post.gateway';
export declare class PostService {
    private postModel;
    private cloudinaryService;
    private commentService;
    private userService;
    private postGateway;
    constructor(postModel: mongoose.Model<Posts>, cloudinaryService: CloudinaryService, commentService: CommentService, userService: UserService, postGateway: PostGateway);
    create(userId: string, post: CreatePostDto): Promise<mongoose.Document<unknown, {}, Posts> & Omit<Posts & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    getUserDetail(userId: string): Promise<mongoose.Document<unknown, {}, import("../user/schema/user.schema").User> & Omit<import("../user/schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    getAll(): Promise<Omit<mongoose.Document<unknown, {}, Posts> & Omit<Posts & {
        _id: mongoose.Types.ObjectId;
    }, never>, never>[]>;
    getById(id: ObjectId): Promise<Posts>;
    update(postId: string, post: UpdatePostDto, userId: string): Promise<mongoose.Document<unknown, {}, Posts> & Omit<Posts & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    delete(postId: string, userId: string): Promise<mongoose.Document<unknown, {}, Posts> & Omit<Posts & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    likePost(postId: string, userId: string): Promise<any>;
    unlikePost(postId: string, userId: string): Promise<mongoose.Document<unknown, {}, Posts> & Omit<Posts & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    addComment(userId: string, postId: string, comment: CreateCommentDto): Promise<mongoose.Document<unknown, {}, import("../comment/schema/comment.schema").Comment> & Omit<import("../comment/schema/comment.schema").Comment & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    deleteComment(commentId: string, userId: string): Promise<mongoose.Document<unknown, {}, import("../comment/schema/comment.schema").Comment> & Omit<import("../comment/schema/comment.schema").Comment & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    getUserProfilePosts(userId: string): Promise<any[]>;
    getPost(postId: string): Promise<mongoose.Document<unknown, {}, Posts> & Omit<Posts & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    getUsersFeed(userIds: string[]): Promise<any[]>;
}
