"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
class MembersController {
    async index({ request, response }) {
        const query = request.qs();
        if (query?.type === 'member') {
            const members = await ResidentRepositoryContract_1.default.allMemberByUnitId(query.unit, request);
            return response.json(members);
        }
        else if (query?.type === 'owner') {
            const members = await ResidentRepositoryContract_1.default.allOwnerByUnitId(query.unit, request);
            return response.json(members);
        }
        else {
            const members = await ResidentRepositoryContract_1.default.allByUnitId(query.unit, request);
            return response.json(members);
        }
    }
    async show({ auth, response, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const resident = await ResidentRepositoryContract_1.default.findById(params.id, project);
        return response.json(resident);
    }
}
exports.default = MembersController;
//# sourceMappingURL=MembersController.js.map