"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class FingerprintsController {
    async index({ request, response, auth }) {
        const fingerSchema = Validator_1.schema.create({
            userId: Validator_1.schema.string({ trim: true }, [Validator_1.rules.maxLength(255)])
        });
        const data = await request.validate({ schema: fingerSchema });
        const roles = await Role_1.default.query().whereIn('name', ['guard', 'guard-supervisor']).whereNull('user_id');
        const user = await User_1.default.query().whereHas('clientStaff', (query) => {
            query.where('staff_code', data.userId).orWhere('nfc_code', data.userId);
        }).whereIn('role_id', roles.map(role => role.id)).where('user_type', UserType_1.UserType.client_staff).firstOrFail();
        await user.load('clientStaff', (query) => query.preload('project'));
        await user.load('items');
        await user.load('fingerprints');
        const token = await auth.use('api').login(user);
        return response.status(200).json({ token: token.toJSON(), user: user });
    }
    async create({ request, auth, response }) {
        const fingerSchema = Validator_1.schema.create({
            fingerprints: Validator_1.schema.array().members(Validator_1.schema.string())
        });
        const data = await request.validate({ schema: fingerSchema });
        const user = auth.user;
        await user.related('fingerprints').query().delete();
        const fingerprints = data.fingerprints.map(fingerprint => ({ fingerprint }));
        await user.related('fingerprints').createMany(fingerprints);
        return response.json(fingerprints);
    }
}
exports.default = FingerprintsController;
//# sourceMappingURL=FingerprintsController.js.map