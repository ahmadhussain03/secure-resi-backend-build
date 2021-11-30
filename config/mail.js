"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const mailConfig = {
    mailer: 'smtp',
    mailers: {
        smtp: {
            driver: 'smtp',
            host: Env_1.default.get('SMTP_HOST', 'smtp.mailtrap.io'),
            port: Env_1.default.get('SMTP_PORT', 2525),
            auth: {
                user: Env_1.default.get('SMTP_USERNAME', '2cba0669e06a8a'),
                pass: Env_1.default.get('SMTP_PASSWORD', 'c994a8ee1d7a66'),
                type: 'login',
            }
        },
    },
};
exports.default = mailConfig;
//# sourceMappingURL=mail.js.map