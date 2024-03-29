"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/LoginValidator"));
const InvalidCredentialException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/InvalidCredentialException"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class LoginController {
    async index({ request, response, auth }) {
        const data = await request.validate(LoginValidator_1.default);
        const query = User_1.default.query();
        let user;
        if (data.project) {
            user = await query.where('username', data.username).where('user_type', UserType_1.UserType.client_staff).whereHas('clientStaff', (query) => {
                query.whereHas('project', (q) => {
                    q.where('code', data.project);
                });
            }).first();
        }
        else {
            user = await query.where('username', data.username).where('user_type', UserType_1.UserType.client_staff).first();
        }
        if (!user)
            throw new InvalidCredentialException_1.default();
        const isValidPassword = await Hash_1.default.verify(user.password, data.password);
        if (!isValidPassword)
            throw new InvalidCredentialException_1.default();
        user.deviceToken = data.device_token;
        await user.save();
        await user.load('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation'));
        await user.load('role', (query) => {
            query.preload('permissions', (q) => {
                q.select(['id', 'name', 'slug', 'group']);
            });
        });
        await user.load('clientStaff', (query) => query.preload('project'));
        await user.load('items');
        const token = await auth.use('api').login(user);
        return response.status(200).json({ token: token.toJSON(), user: user });
    }
    async codeLogin({ response, request, params, auth }) {
        const verificationSchema = Validator_1.schema.create({
            project: Validator_1.schema.string(),
            device_token: Validator_1.schema.string()
        });
        const data = await request.validate({ schema: verificationSchema });
        const user = await User_1.default.query().whereHas('clientStaff', (query) => {
            query.whereHas('project', query => query.where('code', data.project)).where(query => {
                query.where('staff_code', params.id).orWhere('nfc_code', params.id);
            });
        }).where('user_type', UserType_1.UserType.client_staff).preload('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation')).preload('clientStaff').preload('role').firstOrFail();
        user.deviceToken = data.device_token;
        await user.save();
        const token = await auth.use('api').login(user);
        return response.status(200).json({ token: token.toJSON(), user: user });
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map