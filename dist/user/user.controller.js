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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const JwtGuard_1 = require("../auth/utils/JwtGuard");
const update_user_dto_1 = require("./dto/update-user-dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserDetail(req, res) {
        try {
            const user = await this.userService.findUserById(req.user._id);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserById(req, res, userId) {
        try {
            const user = await this.userService.findUserById(userId);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async editUser(req, res, userId, userData) {
        try {
            const user = await this.userService.editUser(userId, userData);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDetail", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)(":userId"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Put)(':userId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('userId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map