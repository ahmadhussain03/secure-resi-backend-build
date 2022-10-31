"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const InvalidCredentialException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/InvalidCredentialException"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Subscriber/LoginValidator"));
class LoginController {
    async index({ request, response, auth }) {
        const data = await request.validate(LoginValidator_1.default);
        const user = await User_1.default.query().where('username', data.username).where('user_type', UserType_1.UserType.subscriber).first();
        if (!user)
            throw new InvalidCredentialException_1.default();
        const isValidPassword = await Hash_1.default.verify(user.password, data.password);
        if (!isValidPassword)
            throw new InvalidCredentialException_1.default();
        await user.load('profile');
        await user.load('role', (query) => {
            query.preload('permissions', (q) => {
                q.select(['id', 'name', 'slug', 'group']);
            });
        });
        const token = await auth.use('api').login(user);
        return response.status(200).json({ token: token.toJSON(), user: user });
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map