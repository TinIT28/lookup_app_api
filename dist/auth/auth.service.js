"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async register(user, res) {
        return this.userService.create(user, res);
    }
    async validateUser(details) {
        console.log('AuthService');
        console.log(details);
        const user = await this.userService.findUserGoogle({ email: details.email });
        console.log(user);
        if (user) {
            console.log("Check user is valid: ", user);
            return user;
        }
        console.log('User not found. Creating...');
        return this.userService.createUserGoogle(details);
    }
    async loginUser(loginUserDto, res) {
        return this.userService.login(loginUserDto, res);
    }
    async logout(res) {
        return this.userService.logout(res);
    }
    async findUser(id) {
        return this.userService.findUserService(id);
    }
    async googleLogin(email) {
        return this.userService.googleLogin(email);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map