"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
class RolesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const search = query.search;
        const roleQuery = Role_1.default.query().where(query => {
            query.where('user_id', authUser.parentId).orWhereNull('user_id');
        });
        if (search) {
            roleQuery.where('name', 'like', `%${query.search}%`);
        }
        const roles = await roleQuery.paginate(page, limit);
        return response.json(roles);
    }
    async show({ response, params, auth }) {
        const userId = auth.user?.id;
        const role = await Role_1.default.query().where('id', params.id).where('user_id', userId).preload('permissions', (query) => {
            query.select(['id', 'name', 'slug']);
        }).firstOrFail();
        return response.json(role);
    }
}
exports.default = RolesController;
//# sourceMappingURL=RolesController.js.map