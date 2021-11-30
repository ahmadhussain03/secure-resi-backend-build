"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const UpdateRoleValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Client/UpdateRoleValidator"));
const CreateRoleValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Client/CreateRoleValidator"));
class RolesController {
    async index({ response, request, auth }) {
        const user = auth.user;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const roles = await Role_1.default.query().where('user_id', user.id).paginate(page, limit);
        return response.json(roles);
    }
    async store({ request, response, auth }) {
        const data = await request.validate(CreateRoleValidator_1.default);
        const user = auth.user;
        const role = await Role_1.default.create({
            name: data.name,
            userId: user.id
        });
        await role.related('permissions').sync(data.permissions);
        await role.load('permissions', (query) => {
            query.select(['id', 'name', 'slug', 'group']);
        });
        return response.json(role);
    }
    async update({ request, response, params, auth }) {
        const data = await request.validate(UpdateRoleValidator_1.default);
        const userId = auth.user?.id;
        const role = await Role_1.default.query().where('id', params.id).where('user_id', userId).firstOrFail();
        role.name = data.name ? data.name : role.name;
        const permissions = data.permissions;
        if (permissions && permissions.length) {
            await role.related('permissions').sync(permissions);
        }
        await role.load('permissions', (query) => {
            query.select(['id', 'name', 'slug', 'group']);
        });
        await role.save();
        return response.json(role);
    }
    async show({ response, params, auth }) {
        const userId = auth.user?.id;
        const role = await Role_1.default.query().where('id', params.id).where('user_id', userId).preload('permissions', (query) => {
            query.select(['id', 'name', 'slug', 'group']);
        }).firstOrFail();
        return response.json(role);
    }
    async destroy({ response, params, auth }) {
        const userId = auth.user?.id;
        const role = await Role_1.default.query().where('id', params.id).where('user_id', userId).firstOrFail();
        await role.delete();
        return response.status(200).json({ message: 'Role Deleted Successfully!' });
    }
}
exports.default = RolesController;
//# sourceMappingURL=RolesController.js.map