"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AttendanceRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/AttendanceRepositoryContract"));
class AttendancesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const attendances = await AttendanceRepositoryContract_1.default.allPaginated(request, project);
        return response.json(attendances);
    }
}
exports.default = AttendancesController;
//# sourceMappingURL=AttendancesController.js.map