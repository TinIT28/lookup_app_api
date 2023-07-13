import { UserService } from './user.service';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user-dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserDetail(req: any, res: Response): Promise<void>;
    getUserById(req: any, res: Response, userId: string): Promise<void>;
    editUser(req: any, res: Response, userId: string, userData: UpdateUserDto): Promise<void>;
}
