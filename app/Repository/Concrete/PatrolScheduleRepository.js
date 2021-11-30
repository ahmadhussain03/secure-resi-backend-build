"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolSchedule_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolSchedule"));
const luxon_1 = require("luxon");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class PatrolScheduleRepository {
    async list(request, project, userId) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const order = query.order || 'asc';
        const filter = query.filter;
        const schedulesQuery = PatrolSchedule_1.default.query().where('project_id', project.id).preload('patrolScheduleRoutine').preload('checkpoints');
        if (order) {
            schedulesQuery.orderBy('created_at', order);
        }
        if (filter) {
            const currentTime = luxon_1.DateTime.now().toFormat('HH:mm:ss');
            const todayDate = luxon_1.DateTime.now().toFormat('yyyy-MM-dd');
            const todayDateNumber = luxon_1.DateTime.now().toFormat('dd');
            const today = luxon_1.DateTime.now().weekdayLong.toLowerCase();
            if (filter === 'upcoming') {
                schedulesQuery.whereHas('patrolScheduleRoutine', (query) => {
                    query.where(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Monthly').where('startTime', '>=', currentTime).whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]);
                    }).orWhere(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Yearly').where('startTime', '>=', currentTime).whereRaw('DATE(check_date) = ?', [todayDate]);
                    }).orWhere(q => {
                        q.whereNull('checkDate').where('repeat', 'Daily').where('startTime', '>=', currentTime).whereRaw(`${today} = ?`, [true]);
                    });
                });
            }
            else if (filter == 'today') {
                schedulesQuery.whereNotExists(Database_1.default.raw(`SELECT * FROM patrol_schedule_entries WHERE patrol_schedule_entries.patrol_schedule_id = patrol_schedules.id AND patrol_schedule_entries.user_id = ${userId} AND DATE(patrol_schedule_entries.created_at) = '${todayDate}'`))
                    .whereHas('patrolScheduleRoutine', (query) => {
                    query.where(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]);
                    }).orWhere(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [todayDate]);
                    }).orWhere(q => {
                        q.whereNull('checkDate').where('repeat', 'Daily').whereRaw(`${today} = ?`, [true]);
                    });
                });
            }
            else if (filter == 'tomorrow') {
                const tomorrowDate = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd');
                const tomorrowDateNumber = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('dd');
                const tomorrow = luxon_1.DateTime.now().plus({ days: 1 }).weekdayLong.toLowerCase();
                schedulesQuery.whereHas('patrolScheduleRoutine', (query) => {
                    query.where(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [tomorrowDateNumber]);
                    }).orWhere(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [tomorrowDate]);
                    }).orWhere(q => {
                        q.whereNull('checkDate').where('repeat', 'Daily').whereRaw(`${tomorrow} = ?`, [true]);
                    });
                });
            }
        }
        const schedules = await schedulesQuery.paginate(page, limit);
        return schedules;
    }
    async create(data) {
        const schedule = await PatrolSchedule_1.default.create({
            name: data.name,
            status: data.status,
            description: data.description,
            userId: data.userId,
            projectId: data.projectId
        });
        data.routine.patrolScheduleId = schedule.id;
        const checkpoints = data.checkpoints.reduce((obj, item) => {
            return {
                ...obj,
                [item['checkpoint']]: { priority: item.priority, estimated_time: item.estimated_time }
            };
        }, {});
        await schedule.related('checkpoints').sync(checkpoints);
        await schedule.load('checkpoints');
        await schedule.related('patrolScheduleRoutine').create(data.routine);
        await schedule.load('patrolScheduleRoutine');
        return schedule;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const order = query.order || 'asc';
        const filter = query.filter;
        const schedulesQuery = PatrolSchedule_1.default.query().where('project_id', project.id).preload('patrolScheduleRoutine').preload('checkpoints');
        if (order) {
            schedulesQuery.orderBy('created_at', order);
        }
        if (filter) {
            const currentTime = luxon_1.DateTime.now().toFormat('HH:mm:ss');
            const todayDate = luxon_1.DateTime.now().toFormat('yyyy-MM-dd');
            const todayDateNumber = luxon_1.DateTime.now().toFormat('dd');
            const today = luxon_1.DateTime.now().weekdayLong.toLowerCase();
            if (filter === 'upcoming') {
                schedulesQuery.whereHas('patrolScheduleRoutine', (query) => {
                    query.where(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Monthly').where('startTime', '>=', currentTime).whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]);
                    }).orWhere(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Yearly').where('startTime', '>=', currentTime).whereRaw('DATE(check_date) = ?', [todayDate]);
                    }).orWhere(q => {
                        q.whereNull('checkDate').where('repeat', 'Daily').where('startTime', '>=', currentTime).whereRaw(`${today} = ?`, [true]);
                    });
                });
            }
            else if (filter == 'today') {
                schedulesQuery.whereHas('patrolScheduleRoutine', (query) => {
                    query.where(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]);
                    }).orWhere(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [todayDate]);
                    }).orWhere(q => {
                        q.whereNull('checkDate').where('repeat', 'Daily').whereRaw(`${today} = ?`, [true]);
                    });
                });
            }
            else if (filter == 'tomorrow') {
                const tomorrowDate = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd');
                const tomorrowDateNumber = luxon_1.DateTime.now().plus({ days: 1 }).toFormat('dd');
                const tomorrow = luxon_1.DateTime.now().plus({ days: 1 }).weekdayLong.toLowerCase();
                schedulesQuery.whereHas('patrolScheduleRoutine', (query) => {
                    query.where(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [tomorrowDateNumber]);
                    }).orWhere(q => {
                        q.whereNotNull('checkDate').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [tomorrowDate]);
                    }).orWhere(q => {
                        q.whereNull('checkDate').where('repeat', 'Daily').whereRaw(`${tomorrow} = ?`, [true]);
                    });
                });
            }
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
        if (data.routine) {
            data.routine.patrolScheduleId = schedule.id;
            await schedule.related('patrolScheduleRoutine').updateOrCreate({}, data.routine);
            await schedule.load('patrolScheduleRoutine');
        }
        if (data.checkpoints && data.checkpoints.length) {
            const checkpoints = data.checkpoints.reduce((obj, item) => {
                return {
                    ...obj,
                    [item['checkpoint']]: { priority: item.priority, estimated_time: item.estimated_time }
                };
            }, {});
            await schedule.related('checkpoints').sync(checkpoints);
            await schedule.load('checkpoints');
        }
        return schedule;
    }
    async findById(id, project) {
        const schedule = await PatrolSchedule_1.default.query().preload('patrolScheduleRoutine').preload('checkpoints').where('id', id).where('project_id', project.id).firstOrFail();
        return schedule;
    }
}
exports.default = PatrolScheduleRepository;
//# sourceMappingURL=PatrolScheduleRepository.js.map