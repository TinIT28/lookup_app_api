"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return request.cookies['jwt'];
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: 'tinIT28',
        });
    }
    async validate(payload) {
        return Object.assign({}, payload.user);
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=JwtStrategy.js.map