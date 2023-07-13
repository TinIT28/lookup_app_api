import * as mongoose from 'mongoose';
export declare class Posts {
    content: string;
    images: string[];
    user: any;
    likes: string[];
    comments: any[];
}
export declare const PostsSchema: mongoose.Schema<Posts, mongoose.Model<Posts, any, any, any, mongoose.Document<unknown, any, Posts> & Omit<Posts & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Posts, mongoose.Document<unknown, {}, mongoose.FlatRecord<Posts>> & Omit<mongoose.FlatRecord<Posts> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
