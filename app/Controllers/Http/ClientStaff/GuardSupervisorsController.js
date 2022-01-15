"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class GuardSupervisorsController {
    async index({ auth, response }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const guardRole = await Role_1.default.query().where('name', 'guard-supervisor').firstOrFail();
        const guards = await User_1.default.query().whereHas('clientStaff', q => q.where('project_id', project.id)).where('role_id', guardRole.id).preload('items').preload('profile', q => q.preload('cityRelation').preload('countryRelation').preload('stateRelation')).preload('clientStaff');
        return response.json(guards);
    }
}
exports.default = GuardSupervisorsController;
//# sourceMappingURL=GuardSupervisorsController.js.map