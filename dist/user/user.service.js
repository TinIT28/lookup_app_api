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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_gateway_1 = require("./user.gateway");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let UserService = class UserService {
    constructor(userModel, cloudinaryService, jwtService, userGateway) {
        this.userModel = userModel;
        this.cloudinaryService = cloudinaryService;
        this.jwtService = jwtService;
        this.userGateway = userGateway;
    }
    async create(user, res) {
        if (user.password !== user.confirmPassword) {
            throw Error("Please input confirm password match password");
        }
        else {
            user.hashPassword = await bcrypt.hash(user.password, 8);
            const newUser = await this.userModel.create(user);
            await newUser.save();
            delete newUser.password;
            const jwt = await this.jwtService.signAsync({ newUser });
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie('jwt', jwt, options).json({
                jwt,
                user: newUser
            });
        }
    }
    async findUserNameById(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        const doesUserExist = !!user;
        if (!doesUserExist)
            return null;
        const doesPasswordMatch = await bcrypt.compare(password, user.hashPassword);
        if (!doesPasswordMatch)
            return null;
        return user;
    }
    async login(loginDto, res) {
        const { email, password } = loginDto;
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.hashPassword);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const jwt = await this.jwtService.signAsync({ user });
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.status(200).cookie('jwt', jwt, options).json({
            user,
            jwt,
        });
    }
    async logout(res) {
        res.cookie("jwt", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            message: "Logouted out"
        });
    }
    async googleLogin(email) {
        const jwt = await this.jwtService.signAsync({ email });
        return { token: jwt };
    }
    async findUserGoogle(email) {
        const user = await this.userModel.findOne(email);
        return user;
    }
    async findUserLocal(email) {
        const user = await this.userModel.findOne({ email });
        return user;
    }
    async createUserGoogle(details) {
        const newUser = await this.userModel.create(details);
        return newUser.save();
    }
    async findUserService(id) {
        const user = await this.userModel.findById(id);
        return user;
    }
    async findUserById(userId) {
        try {
            const user = await this.userModel.findById(userId).select("-hashPassword");
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async editUser(userId, userData) {
        try {
            const user = await this.userModel.findById(userId).select("-hashPassword");
            if (user) {
                user.name = userData.name;
                user.categoryBusiness = userData.categoryBusiness;
                user.phoneNumber = userData.phoneNumber;
                user.ward = userData.address;
                if (userData.image && user.image !== userData.image) {
                    user.image = (await this.cloudinaryService.convertImagesCloudinary(userData.image));
                }
                this.userGateway.handleUpdateUser(user);
                return await user.save();
            }
            else {
                throw Error("User not found");
            }
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, cloudinary_service_1.CloudinaryService,
        jwt_1.JwtService,
        user_gateway_1.UserGateway])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map