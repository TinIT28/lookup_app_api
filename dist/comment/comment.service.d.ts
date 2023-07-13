import { Comment } from './schema/comment.schema';
import mongoose from 'mongoose';
import { CreateCommentDto } from './dto/create-comment-dto';
export declare class CommentService {
    private commentModel;
    constructor(commentModel: mongoose.Model<Comment>);
    postComment(userId: string, comment: CreateCommentDto): Promise<mongoose.Document<unknown, {}, Comment> & Omit<Comment & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    deleteComment(commentId: string, userId: string): Promise<mongoose.Document<unknown, {}, Comment> & Omit<Comment & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    deleteCommentByIds(commentIds: any[]): Promise<void>;
}
