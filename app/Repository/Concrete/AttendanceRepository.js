"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Attendance"));
const luxon_1 = require("luxon");
class AttendanceRepository {
    async create(data) {
        const attendance = await Attendance_1.default.create(data);
        await attendance.load('user');
        return attendance;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const startDate = query.startDate;
        const endDate = query.endDate;
        const attendanceQuery = Attendance_1.default.query().where('project_id', project.id).preload('user', (query) => {
            query.preload('profile');
        });
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd', { zone: 'Asia/Kuala_Lumpur' }).toFormat('yyyy-MM-dd');
            attendanceQuery.whereRaw('DATE(created_at) >= ?', [formattedStartDate]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd', { zone: 'Asia/Kuala_Lumpur' }).toFormat('yyyy-MM-dd');
            attendanceQuery.whereRaw('DATE(created_at) <= ?', [formattedEndDate]);
        }
        const attendances = await attendanceQuery.paginate(page, limit);
        return attendances;
    }
}
exports.default = AttendanceRepository;
//# sourceMappingURL=AttendanceRepository.js.map