import { User } from './schema/user.schema';
import mongoose, { ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';
import { UserDetails } from 'src/utils/types';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserGateway } from './user.gateway';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class UserService {
    private userModel;
    private cloudinaryService;
    private jwtService;
    private userGateway;
    constructor(userModel: mongoose.Model<User>, cloudinaryService: CloudinaryService, jwtService: JwtService, userGateway: UserGateway);
    create(user: CreateUserDto, res: Response): Promise<void>;
    findUserNameById(userId: string): Promise<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    validateUser(email: string, password: string): Promise<User | undefined>;
    login(loginDto: LoginUserDto, res: Response): Promise<void>;
    logout(res: Response): Promise<void>;
    googleLogin(email: string): Promise<{
        token: string;
    } | undefined>;
    findUserGoogle(email: any): Promise<User>;
    findUserLocal(email: string): Promise<User | undefined>;
    createUserGoogle(details: UserDetails): Promise<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    findUserService(id: ObjectId): Promise<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    findUserById(userId: string): Promise<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    editUser(userId: string, userData: UpdateUserDto): Promise<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
}
