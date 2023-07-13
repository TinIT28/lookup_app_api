"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const GoogleStrategy_1 = require("./utils/GoogleStrategy");
const Serializer_1 = require("./utils/Serializer");
const JwtGuard_1 = require("./utils/JwtGuard");
const JwtStrategy_1 = require("./utils/JwtStrategy");
const jwt_1 = require("@nestjs/jwt");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: 'secret1234',
                    signOptions: { expiresIn: '3600s' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            JwtGuard_1.JwtGuard,
            JwtStrategy_1.JwtStrategy,
            GoogleStrategy_1.GoogleStrategy,
            Serializer_1.SessionSerializer,
            {
                provide: 'AUTH_SERVICE',
                useClass: auth_service_1.AuthService
            },
            jwt_1.JwtService
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map