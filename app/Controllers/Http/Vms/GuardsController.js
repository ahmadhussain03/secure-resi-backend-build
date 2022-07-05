"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class GuardsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const query = request.qs();
        let role = query.role ? query.role.toLowerCase() : null;
        let search = query.search ?? null;
        const usersQuery = User_1.default.query().where('user_type', UserType_1.UserType.client_staff).whereHas('clientStaff', (query) => {
            query.where('project_id', projectId);
        });
        if (role) {
            usersQuery.whereHas('role', (query) => {
                query.where('name', role);
            });
        }
        if (search) {
            usersQuery.where((query) => {
                query.where('username', 'like', `%${search}%`).orWhereHas('clientStaff', (subQuery) => {
                    subQuery.where('nfc_code', 'like', `%${search}%`).orWhere('staff_code', 'like', `%${search}%`);
                }).orWhereHas('profile', subQuery => {
                    subQuery.where('name', 'like', `%${search}%`).orWhere('email', 'like', `%${search}%`);
                });
            });
        }
        const users = await usersQuery.preload('profile');
        return response.json(users);
    }
}
exports.default = GuardsController;
//# sourceMappingURL=GuardsController.js.map