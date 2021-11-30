"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
class ClientStaffProjectsController {
    async store({ response, params, auth }) {
        const authUser = auth.user;
        const user = await User_1.default.query().where('id', params.id).preload('clientStaff').preload('profile').firstOrFail();
        const project = await Project_1.default.query().where('id', params.projectId).where('user_id', authUser.id).firstOrFail();
        user.clientStaff.projectId = project.id;
        await user.clientStaff.save();
        await user.clientStaff.load('project');
        return response.json(user);
    }
    async destroy({ response, params }) {
        const user = await User_1.default.query().where('id', params.id).whereHas('clientStaff', (query) => {
            query.where('project_id', params.projectId);
        }).preload('clientStaff').preload('profile').firstOrFail();
        user.clientStaff.projectId = null;
        await user.clientStaff.save();
        return response.json(user);
    }
}
exports.default = ClientStaffProjectsController;
//# sourceMappingURL=ClientStaffProjectsController.js.map