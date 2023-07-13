import mongoose from "mongoose";
export declare class Comment {
    author: any;
    content: string;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Omit<Comment & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & Omit<mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
