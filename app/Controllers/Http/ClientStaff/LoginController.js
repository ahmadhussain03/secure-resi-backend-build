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
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const luxon_1 = require("luxon");
class LoginController {
    async index({ request, response, auth }) {
        const data = await request.validate(LoginValidator_1.default);
        const query = User_1.default.query();
        let user;
        const roles = await Role_1.default.query().where('name', 'guard').whereNull('user_id');
        if (data.project) {
            user = await query.where('username', data.username).where('user_type', UserType_1.UserType.client_staff).whereHas('clientStaff', (query) => {
                query.whereHas('project', (q) => {
                    q.where('code', data.project);
                });
            }).whereNotIn('role_id', roles.map(role => role.id)).first();
        }
        else {
            user = await query.where('username', data.username).where('user_type', UserType_1.UserType.client_staff).whereNotIn('role_id', roles.map(role => role.id)).first();
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
    async guard({ request, response, auth }) {
        const data = await request.validate(LoginValidator_1.default);
        const query = User_1.default.query();
        let user;
        console.log(luxon_1.Settings.defaultZone);
        const roles = await Role_1.default.query().whereIn('name', ['guard', 'guard-supervisor']).whereNull('user_id');
        if (data.project) {
            user = await query.where('username', data.username).where('user_type', UserType_1.UserType.client_staff).whereHas('clientStaff', (query) => {
                query.whereHas('project', (q) => {
                    q.where('code', data.project);
                });
            }).whereIn('role_id', roles.map(role => role.id)).first();
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
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map