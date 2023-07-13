/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ObjectId } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { LoginUserDto } from '../user/dto/login-user-dto';
import { UserService } from '../user/user.service';
import { UserDetails } from '../utils/types';
import { User } from 'src/user/schema/user.schema';
import { Response } from 'express';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    register(user: CreateUserDto, res: Response): Promise<void>;
    validateUser(details: UserDetails): Promise<User>;
    loginUser(loginUserDto: LoginUserDto, res: Response): Promise<void>;
    logout(res: Response): Promise<void>;
    findUser(id: ObjectId): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    googleLogin(email: string): Promise<{
        token: string;
    } | undefined>;
}
