"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attendance_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Attendance"));
const Checkpoint_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Checkpoint"));
const GuardOperation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GuardOperation"));
const LogBook_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/LogBook"));
const PatrolEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolEntry"));
const PatrolScheduleEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolScheduleEntry"));
const ScheduleEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ScheduleEntry"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const luxon_1 = require("luxon");
class DashboardController {
    async index({ request, auth, response }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const query = request.qs();
        const filter = query.filter;
        if (filter === 'today') {
            const todayDate = luxon_1.DateTime.now().toFormat('yyyy-MM-dd');
            const staffPerRole = await User_1.default.query().select(['role_id']).whereNotNull('role_id').whereRaw(`DATE(created_at) = ?`, [todayDate]).groupBy('role_id').count('id', 'role_count').preload('role');
            const checkpointCount = await Checkpoint_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).pojo().count('id', 'total').first();
            const schedulesPerStatus = await ScheduleEntry_1.default.query().select(['status']).whereRaw(`DATE(dated) = ?`, [todayDate]).whereHas('schedule', query => query.where('project_id', project.id)).groupBy('status').count('id', 'count');
            const patrolSchedulePerStatus = await PatrolScheduleEntry_1.default.query().whereRaw(`DATE(dated) = ?`, [todayDate]).where('project_id', project.id).groupBy('status').count('id', 'count');
            const patrolCount = await PatrolEntry_1.default.query().where('project_id', project.id).whereRaw(`DATE(dated) = ?`, [todayDate]).pojo().count('id', 'total').first();
            const guardOperationCount = await GuardOperation_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).pojo().count('id', 'total').first();
            const logBookCount = await LogBook_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).pojo().count('id', 'total').first();
            const checkCount = await Attendance_1.default.query().select(['type']).where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).groupBy('type').count('id', 'type_count');
            return response.json({ staffPerRole, schedulesPerStatus, patrolSchedulePerStatus, checkCount, checkpointCount, patrolCount, guardOperationCount, logBookCount });
        }
        else if (filter === 'yesterday') {
            const yesterdayDate = luxon_1.DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd');
            const staffPerRole = await User_1.default.query().select(['role_id']).whereNotNull('role_id').whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).groupBy('role_id').count('id', 'role_count').preload('role');
            const checkpointCount = await Checkpoint_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).pojo().count('id', 'total').first();
            const schedulesPerStatus = await ScheduleEntry_1.default.query().select(['status']).whereRaw(`DATE(dated) = ?`, [yesterdayDate]).whereHas('schedule', query => query.where('project_id', project.id)).groupBy('status').count('id', 'count');
            const patrolSchedulePerStatus = await PatrolScheduleEntry_1.default.query().whereRaw(`DATE(dated) = ?`, [yesterdayDate]).where('project_id', project.id).groupBy('status').count('id', 'count');
            const patrolCount = await PatrolEntry_1.default.query().where('project_id', project.id).whereRaw(`DATE(dated) = ?`, [yesterdayDate]).pojo().count('id', 'total').first();
            const guardOperationCount = await GuardOperation_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).pojo().count('id', 'total').first();
            const logBookCount = await LogBook_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).pojo().count('id', 'total').first();
            const checkCount = await Attendance_1.default.query().select(['type']).where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).groupBy('type').count('id', 'type_count');
            return response.json({ staffPerRole, schedulesPerStatus, patrolSchedulePerStatus, checkCount, checkpointCount, patrolCount, guardOperationCount, logBookCount });
        }
        else {
            const monthNumber = luxon_1.DateTime.now().toFormat('MM');
            const staffPerRole = await User_1.default.query().select(['role_id']).whereNotNull('role_id').whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).groupBy('role_id').count('id', 'role_count').preload('role');
            const checkpointCount = await Checkpoint_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).pojo().count('id', 'total').first();
            const schedulesPerStatus = await ScheduleEntry_1.default.query().select(['status']).whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).whereHas('schedule', query => query.where('project_id', project.id)).groupBy('status').count('id', 'count');
            const patrolSchedulePerStatus = await PatrolScheduleEntry_1.default.query().whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).where('project_id', project.id).groupBy('status').count('id', 'count');
            const patrolCount = await PatrolEntry_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).pojo().count('id', 'total').first();
            const guardOperationCount = await GuardOperation_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).pojo().count('id', 'total').first();
            const logBookCount = await LogBook_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).pojo().count('id', 'total').first();
            const checkCount = await Attendance_1.default.query().select(['type']).where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).groupBy('type').count('id', 'type_count');
            return response.json({ staffPerRole, schedulesPerStatus, patrolSchedulePerStatus, checkCount, checkpointCount, patrolCount, guardOperationCount, logBookCount });
        }
    }
}
exports.default = DashboardController;
//# sourceMappingURL=DashboardController.js.map