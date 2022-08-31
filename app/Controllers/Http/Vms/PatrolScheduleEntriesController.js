"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolScheduleEntryRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PatrolScheduleEntryRepositoryContract"));
class PatrolScheduleEntriesController {
    async index({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolScheduleEntryRepositoryContract_1.default.allPaginated(request, projectId);
        return response.json(entries);
    }
    async show({ request, response, auth, params }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolScheduleEntryRepositoryContract_1.default.searchByPatrolScheduleId(request, params.id, projectId);
        return response.json(entries);
    }
}
exports.default = PatrolScheduleEntriesController;
//# sourceMappingURL=PatrolScheduleEntriesController.js.map