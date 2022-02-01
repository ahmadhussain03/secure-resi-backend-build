"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const InvalidCredentialException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/InvalidCredentialException"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const Unit_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Unit"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const RegisterValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/RegisterValidator"));
const ResidentLoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/ResidentLoginValidator"));
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
class AuthController {
    async login({ request, response, auth }) {
        const data = await request.validate(ResidentLoginValidator_1.default);
        const query = User_1.default.query();
        let user = await query.where('username', data.username).where('user_type', UserType_1.UserType.resident).whereHas('resident', (query) => {
            query.where('project_id', data.project);
        }).preload('resident').first();
        if (!user)
            throw new InvalidCredentialException_1.default();
        if (user.resident.isApproved === false) {
            return response
                .status(401)
                .json({
                errors: [
                    { message: 'Login Not approved yet. Wait for your login to approve than only you can register.' }
                ]
            });
        }
        const isValidPassword = await Hash_1.default.verify(user.password, data.password);
        if (!isValidPassword)
            throw new InvalidCredentialException_1.default();
        user.deviceToken = data.device_token;
        await user.save();
        await user.load('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation'));
        await user.load('role', (query) => {
            query.preload('permissions', (q) => {
                q.select(['id', 'name', 'slug']);
            });
        });
        await user.load('resident', (query) => {
            query.preload('project').preload('units', q => {
                q.preload('members');
                q.preload('residents');
            });
        });
        const token = await auth.use('api').login(user);
        return response.status(200).json({ token: token.toJSON(), user: user });
    }
    async register({ request, response }) {
        const data = await request.validate(RegisterValidator_1.default);
        data.username = data.email;
        data.userType = UserType_1.UserType.resident;
        data.isApproved = false;
        if (data.type === 'owner') {
            const unit = await Unit_1.default.query().where('id', data.unitId).doesntHave('allOwners').firstOrFail();
            data.projectId = unit.projectId;
            const role = await Role_1.default.query().where('name', 'owner').firstOrFail();
            data.roleId = role.id;
        }
        else {
            const unit = await Unit_1.default.query().where('id', data.unitId).firstOrFail();
            data.projectId = unit.projectId;
            const role = await Role_1.default.query().where('name', 'resident').firstOrFail();
            data.roleId = role.id;
        }
        const resident = await ResidentRepositoryContract_1.default.create(data, request);
        return response.json({ user: resident, message: 'Signup has been completed. You can now login after successful approval or contact service provider for your login detaills.' });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map