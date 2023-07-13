"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: 'jfaejlfhsdhafddksf',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000,
        }
    }));
    app.use(bodyParser.json({ limit: '20mb' }));
    app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    await app.listen(process.env.PORT || "0.0.0.0");
}
bootstrap();
//# sourceMappingURL=main.js.map