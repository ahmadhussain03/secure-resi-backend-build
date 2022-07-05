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
const PatrolSchedule_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolSchedule"));
const PatrolScheduleEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolScheduleEntry"));
const ScheduleEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ScheduleEntry"));
const ScheduleRoutine_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ScheduleRoutine"));
const luxon_1 = require("luxon");
class DashboardController {
    async index({ request, auth, response }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const query = request.qs();
        const filter = query.filter;
        if (filter === 'today') {
            const todayDate = luxon_1.DateTime.now().toFormat('yyyy-MM-dd');
            const checkpointCount = await Checkpoint_1.default.query().where('project_id', project.id).pojo().count('id', 'total').first();
            const scheduleRoutineCount = await ScheduleRoutine_1.default.query().whereHas('checkpoint', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).whereHas('schedule', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).where('project_id', project.id)).pojo().count('id', 'total').first();
            const patrolSchduleCount = await PatrolSchedule_1.default.query().whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).whereHas('checkpoints', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).where('project_id', project.id).pojo().count('id', 'total').first();
            const patrolCount = await PatrolEntry_1.default.query().where('project_id', project.id).whereRaw(`DATE(dated) = ?`, [todayDate]).pojo().count('id', 'total').first();
            const schedulesEntryOnTime = await ScheduleEntry_1.default.query().whereRaw(`DATE(created_at) = ?`, [todayDate]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'On Time').pojo().count('id', 'total').first();
            const schedulesEntryAfterTime = await ScheduleEntry_1.default.query().whereRaw(`DATE(created_at) = ?`, [todayDate]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'After Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryOnTime = await PatrolScheduleEntry_1.default.query().whereRaw(`DATE(created_at) = ?`, [todayDate]).where('project_id', project.id).where('status', 'On Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryAfterTime = await PatrolScheduleEntry_1.default.query().whereRaw(`DATE(created_at) = ?`, [todayDate]).where('project_id', project.id).where('status', 'After Time').pojo().count('id', 'total').first();
            const guardOperationCount = await GuardOperation_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).pojo().count('id', 'total').first();
            const logBookCount = await LogBook_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).pojo().count('id', 'total').first();
            const checkInCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).where('type', 'In').pojo().count('id', 'total').first();
            const checkOutCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [todayDate]).where('type', 'Out').pojo().count('id', 'total').first();
            return response.json({
                totalCheckpoints: checkpointCount?.total ?? 0,
                totalPatrol: patrolCount?.total ?? 0,
                totalScheduleRoutine: scheduleRoutineCount?.total ?? 0,
                totalPatrolSchdule: patrolSchduleCount?.total ?? 0,
                totalLogEntries: logBookCount?.total ?? 0,
                totalOperationEntries: guardOperationCount?.total ?? 0,
                attendanceIn: checkInCount?.total ?? 0,
                attendanceOut: checkOutCount?.total ?? 0,
                scheduleEntriesOnTime: schedulesEntryOnTime?.total ?? 0,
                schedulesEntryAfterTime: schedulesEntryAfterTime?.total ?? 0,
                patrolScheduleEntryOnTime: patrolScheduleEntryOnTime?.total ?? 0,
                patrolScheduleEntryAfterTime: patrolScheduleEntryAfterTime?.total ?? 0
            });
        }
        else if (filter === 'yesterday') {
            const yesterdayDate = luxon_1.DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd');
            const checkpointCount = await Checkpoint_1.default.query().where('project_id', project.id).pojo().count('id', 'total').first();
            const scheduleRoutineCount = await ScheduleRoutine_1.default.query().whereHas('checkpoint', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).whereHas('schedule', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).where('project_id', project.id)).pojo().count('id', 'total').first();
            const patrolSchduleCount = await PatrolSchedule_1.default.query().whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).whereHas('checkpoints', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).where('project_id', project.id).pojo().count('id', 'total').first();
            const patrolCount = await PatrolEntry_1.default.query().where('project_id', project.id).whereRaw(`DATE(dated) = ?`, [yesterdayDate]).pojo().count('id', 'total').first();
            const schedulesEntryOnTime = await ScheduleEntry_1.default.query().whereRaw(`DATE(dated) = ?`, [yesterdayDate]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'On Time').pojo().count('id', 'total').first();
            const schedulesEntryAfterTime = await ScheduleEntry_1.default.query().whereRaw(`DATE(dated) = ?`, [yesterdayDate]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'After Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryOnTime = await PatrolScheduleEntry_1.default.query().whereRaw(`DATE(dated) = ?`, [yesterdayDate]).where('project_id', project.id).where('status', 'On Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryAfterTime = await PatrolScheduleEntry_1.default.query().whereRaw(`DATE(dated) = ?`, [yesterdayDate]).where('project_id', project.id).where('status', 'After Time').pojo().count('id', 'total').first();
            const guardOperationCount = await GuardOperation_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).pojo().count('id', 'total').first();
            const logBookCount = await LogBook_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).pojo().count('id', 'total').first();
            const checkInCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).where('type', 'In').pojo().count('id', 'total').first();
            const checkOutCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`DATE(created_at) = ?`, [yesterdayDate]).where('type', 'Out').pojo().count('id', 'total').first();
            return response.json({
                totalCheckpoints: checkpointCount?.total ?? 0,
                totalPatrol: patrolCount?.total ?? 0,
                totalScheduleRoutine: scheduleRoutineCount?.total ?? 0,
                totalPatrolSchdule: patrolSchduleCount?.total ?? 0,
                totalLogEntries: logBookCount?.total ?? 0,
                totalOperationEntries: guardOperationCount?.total ?? 0,
                attendanceIn: checkInCount?.total ?? 0,
                attendanceOut: checkOutCount?.total ?? 0,
                scheduleEntriesOnTime: schedulesEntryOnTime?.total ?? 0,
                schedulesEntryAfterTime: schedulesEntryAfterTime?.total ?? 0,
                patrolScheduleEntryOnTime: patrolScheduleEntryOnTime?.total ?? 0,
                patrolScheduleEntryAfterTime: patrolScheduleEntryAfterTime?.total ?? 0
            });
        }
        else if (filter === 'week') {
            const weekDate = luxon_1.DateTime.now().minus({ days: 7 }).toSQL();
            const checkpointCount = await Checkpoint_1.default.query().where('project_id', project.id).pojo().count('id', 'total').first();
            const scheduleRoutineCount = await ScheduleRoutine_1.default.query().whereHas('checkpoint', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).whereHas('schedule', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).where('project_id', project.id)).pojo().count('id', 'total').first();
            const patrolSchduleCount = await PatrolSchedule_1.default.query().whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).whereHas('checkpoints', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).where('project_id', project.id).pojo().count('id', 'total').first();
            const patrolCount = await PatrolEntry_1.default.query().where('project_id', project.id).whereRaw(`dated > ?`, [weekDate]).pojo().count('id', 'total').first();
            const schedulesEntryOnTime = await ScheduleEntry_1.default.query().whereRaw(`dated > ?`, [weekDate]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'On Time').pojo().count('id', 'total').first();
            const schedulesEntryAfterTime = await ScheduleEntry_1.default.query().whereRaw(`dated > ?`, [weekDate]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'After Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryOnTime = await PatrolScheduleEntry_1.default.query().whereRaw(`dated > ?`, [weekDate]).where('project_id', project.id).where('status', 'On Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryAfterTime = await PatrolScheduleEntry_1.default.query().whereRaw(`dated > ?`, [weekDate]).where('project_id', project.id).where('status', 'After Time').pojo().count('id', 'total').first();
            const guardOperationCount = await GuardOperation_1.default.query().where('project_id', project.id).whereRaw(`created_at > ?`, [weekDate]).pojo().count('id', 'total').first();
            const logBookCount = await LogBook_1.default.query().where('project_id', project.id).whereRaw(`created_at > ?`, [weekDate]).pojo().count('id', 'total').first();
            const checkInCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`created_at > ?`, [weekDate]).where('type', 'In').pojo().count('id', 'total').first();
            const checkOutCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`created_at > ?`, [weekDate]).where('type', 'Out').pojo().count('id', 'total').first();
            return response.json({
                totalCheckpoints: checkpointCount?.total ?? 0,
                totalPatrol: patrolCount?.total ?? 0,
                totalScheduleRoutine: scheduleRoutineCount?.total ?? 0,
                totalPatrolSchdule: patrolSchduleCount?.total ?? 0,
                totalLogEntries: logBookCount?.total ?? 0,
                totalOperationEntries: guardOperationCount?.total ?? 0,
                attendanceIn: checkInCount?.total ?? 0,
                attendanceOut: checkOutCount?.total ?? 0,
                scheduleEntriesOnTime: schedulesEntryOnTime?.total ?? 0,
                schedulesEntryAfterTime: schedulesEntryAfterTime?.total ?? 0,
                patrolScheduleEntryOnTime: patrolScheduleEntryOnTime?.total ?? 0,
                patrolScheduleEntryAfterTime: patrolScheduleEntryAfterTime?.total ?? 0
            });
        }
        else {
            const monthNumber = luxon_1.DateTime.now().toFormat('MM');
            const checkpointCount = await Checkpoint_1.default.query().where('project_id', project.id).pojo().count('id', 'total').first();
            const scheduleRoutineCount = await ScheduleRoutine_1.default.query().whereHas('checkpoint', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).whereHas('schedule', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).where('project_id', project.id)).pojo().count('id', 'total').first();
            const patrolSchduleCount = await PatrolSchedule_1.default.query().whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).whereHas('checkpoints', q => q.whereNotIn('status', ['SUSPENDED', 'DEACTIVE'])).where('project_id', project.id).pojo().count('id', 'total').first();
            const patrolCount = await PatrolEntry_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).pojo().count('id', 'total').first();
            const schedulesEntryOnTime = await ScheduleEntry_1.default.query().whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'On Time').pojo().count('id', 'total').first();
            const schedulesEntryAfterTime = await ScheduleEntry_1.default.query().whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).whereHas('schedule', query => query.where('project_id', project.id)).where('status', 'After Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryOnTime = await PatrolScheduleEntry_1.default.query().whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).where('project_id', project.id).where('status', 'On Time').pojo().count('id', 'total').first();
            const patrolScheduleEntryAfterTime = await PatrolScheduleEntry_1.default.query().whereRaw(`EXTRACT(MONTH FROM dated) = ?`, [monthNumber]).where('project_id', project.id).where('status', 'After Time').pojo().count('id', 'total').first();
            const guardOperationCount = await GuardOperation_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).pojo().count('id', 'total').first();
            const logBookCount = await LogBook_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).pojo().count('id', 'total').first();
            const checkInCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).where('type', 'In').pojo().count('id', 'total').first();
            const checkOutCount = await Attendance_1.default.query().where('project_id', project.id).whereRaw(`EXTRACT(MONTH FROM created_at) = ?`, [monthNumber]).where('type', 'Out').pojo().count('id', 'total').first();
            return response.json({
                totalCheckpoints: checkpointCount?.total ?? 0,
                totalPatrol: patrolCount?.total ?? 0,
                totalScheduleRoutine: scheduleRoutineCount?.total ?? 0,
                totalPatrolSchdule: patrolSchduleCount?.total ?? 0,
                totalLogEntries: logBookCount?.total ?? 0,
                totalOperationEntries: guardOperationCount?.total ?? 0,
                attendanceIn: checkInCount?.total ?? 0,
                attendanceOut: checkOutCount?.total ?? 0,
                scheduleEntriesOnTime: schedulesEntryOnTime?.total ?? 0,
                schedulesEntryAfterTime: schedulesEntryAfterTime?.total ?? 0,
                patrolScheduleEntryOnTime: patrolScheduleEntryOnTime?.total ?? 0,
                patrolScheduleEntryAfterTime: patrolScheduleEntryAfterTime?.total ?? 0
            });
        }
    }
}
exports.default = DashboardController;
//# sourceMappingURL=DashboardController.js.map