"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ScheduleRepositoryContract"));
class SchedulesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedules = await ScheduleRepositoryContract_1.default.all(request, project);
        return response.json(schedules);
    }
}
exports.default = SchedulesController;
//# sourceMappingURL=SchedulesController.js.map