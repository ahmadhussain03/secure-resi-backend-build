"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleEntryRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ScheduleEntryRepositoryContract"));
class ScheduleEntriesController {
    async index({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await ScheduleEntryRepositoryContract_1.default.allPaginated(request, projectId);
        return response.json(entries);
    }
}
exports.default = ScheduleEntriesController;
//# sourceMappingURL=ScheduleEntriesController.js.map