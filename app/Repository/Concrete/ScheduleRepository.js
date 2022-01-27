"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Schedule"));
const ScheduleRoutine_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ScheduleRoutine"));
const luxon_1 = require("luxon");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class ScheduleRepository {
    async list(request, project, userId) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const order = query.order || 'asc';
        const filter = query.filter;
        const nfc = query.nfc;
        const scheduleId = query.scheduleId;
        const schedulesQuery = ScheduleRoutine_1.default.query().preload('schedule').preload('checkpoint');
        schedulesQuery.whereHas('checkpoint', query => {
            query.whereNotIn('status', ['SUSPENDED', 'DEACTIVE']);
            if (nfc) {
                query.where('nfc_code', 'like', `%${nfc}%`);
            }
        });
        if (order) {
            schedulesQuery.orderBy('id', order);
        }
        const currentTime = luxon_1.DateTime.now().toFormat('HH:mm:ss');
        const todayDate = luxon_1.DateTime.now().toFormat('yyyy-MM-dd');
        const todayDateNumber = luxon_1.DateTime.now().toFormat('dd');
        const today = luxon_1.DateTime.now().weekdayLong.toLowerCase();
        if (filter) {
            if (filter === 'today') {
                schedulesQuery.whereNotExists(Database_1.default.raw(`SELECT * FROM schedule_entries WHERE schedule_entries.schedule_id = schedule_routines.schedule_id AND schedule_entries.user_id = ${userId} AND DATE(schedule_entries.dated) = '${todayDate}' AND schedule_entries.project_id = ${project.id}`))
                    .where(query => {
                    query.whereNotNull('check_date').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]);
                }).orWhere(query => {
                    query.whereNotNull('check_date').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [todayDate]);
                }).orWhere(query => {
                    query.whereNull('check_date').where('repeat', 'Daily').whereRaw(`${today} = ?`, [true]);
                });
            }
            else if (filter === 'upcoming') {
                schedulesQuery.where(query => {
                    query.whereNotNull('check_date').where('repeat', 'Monthly').where('startTime', '>=', currentTime).whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]);
                }).orWhere(query => {
                    query.whereNotNull('check_date').where('repeat', 'Yearly').where('startTime', '>=', currentTime).whereRaw('DATE(check_date) = ?', [todayDate]);
                }).orWhere(query => {
                    query.whereNull('check_date').where('repeat', 'Daily').where('startTime', '>=', currentTime).whereRaw(`${today} = ?`, [true]);
                });
            }
            else if (filter === 'tomorrow') {
                const tomorrowDate = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd');
                const tomorrowDateNumber = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('dd');
                const tomorrow = luxon_1.DateTime.now().plus({ days: 1 }).weekdayLong.toLowerCase();
                schedulesQuery.where(query => {
                    query.whereNotNull('check_date').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [tomorrowDateNumber]);
                }).orWhere(query => {
                    query.whereNotNull('check_date').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [tomorrowDate]);
                }).orWhere(query => {
                    query.whereNull('check_date').where('repeat', 'Daily').whereRaw(`${tomorrow} = ?`, [true]);
                });
            }
            else {
                const tomorrowDate = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd');
                const tomorrowDateNumber = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('dd');
                const tomorrow = luxon_1.DateTime.now().plus({ days: 1 }).weekdayLong.toLowerCase();
                schedulesQuery.whereNotExists(Database_1.default.raw(`SELECT * FROM schedule_entries WHERE schedule_entries.schedule_id = schedule_routines.schedule_id AND schedule_entries.user_id = ${userId} AND DATE(schedule_entries.dated) = '${todayDate}'`))
                    .where(query => {
                    query.whereNotNull('check_date').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]).orWhereRaw('EXTRACT(DAY FROM check_date) = ?', [tomorrowDateNumber]);
                }).orWhere(query => {
                    query.whereNotNull('check_date').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [todayDate]).orWhereRaw('DATE(check_date) = ?', [tomorrowDate]);
                }).orWhere(query => {
                    query.whereNull('check_date').where('repeat', 'Daily').whereRaw(`${today} = ?`, [true]).orWhereRaw(`${tomorrow} = ?`, [true]);
                });
            }
        }
        schedulesQuery.whereHas('schedule', query => {
            query.whereNotIn('status', ['SUSPENDED', 'DEACTIVE']).where('project_id', project.id);
            if (scheduleId) {
                query.where('id', scheduleId);
            }
        });
        const schedules = await schedulesQuery.paginate(page, limit);
        return schedules;
    }
    async create(data) {
        const schedule = await Schedule_1.default.create({
            name: data.name,
            status: data.status,
            description: data.description,
            userId: data.userId,
            projectId: data.projectId
        });
        const routines = data.routines.map(routine => {
            routine.scheduleId = schedule.id;
            return routine;
        });
        await schedule.related('scheduleRoutine').createMany(routines);
        await schedule.load('scheduleRoutine');
        return schedule;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const search = query.search ?? "";
        const schedulesQuery = Schedule_1.default.query().where('project_id', project.id);
        if (search) {
            schedulesQuery.where((query) => {
                query.where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`).orWhere('status', 'like', `%${search}%`);
            });
        }
        const schedules = await schedulesQuery.paginate(page, limit);
        return schedules;
    }
    async destroyById(id, project) {
        const schedule = await this.findById(id, project);
        await schedule.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const schedule = await this.findById(id, project);
        schedule.name = data.name ? data.name : schedule.name;
        schedule.description = data.description ? data.description : schedule.description;
        schedule.status = data.status ? data.status : schedule.status;
        await schedule.save();
        if (data.routines && data.routines.length) {
            await schedule.scheduleRoutine.forEach(async (routine) => await routine.delete());
            const routines = data.routines.map(routine => {
                routine.scheduleId = schedule.id;
                return routine;
            });
            await schedule.related('scheduleRoutine').createMany(routines);
        }
        await schedule.load('scheduleRoutine');
        return schedule;
    }
    async findById(id, project) {
        const schedule = await Schedule_1.default.query().preload('scheduleRoutine').where('id', id).where('project_id', project.id).firstOrFail();
        return schedule;
    }
}
exports.default = ScheduleRepository;
//# sourceMappingURL=ScheduleRepository.js.map