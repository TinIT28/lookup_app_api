import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
export declare class SessionSerializer extends PassportSerializer {
    private readonly authService;
    constructor(authService: AuthService);
    serializeUser(user: any, done: Function): void;
    deserializeUser(payload: any, done: Function): any;
}
