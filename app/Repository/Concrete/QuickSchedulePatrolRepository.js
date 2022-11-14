"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSchedulePatrol_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/QuickSchedulePatrol"));
const QuickSchedulePatrolCheckpoint_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/QuickSchedulePatrolCheckpoint"));
const luxon_1 = require("luxon");
class QuickSchedulePatrolRepository {
    async create(data) {
        const startTime = luxon_1.DateTime.fromFormat(data.startAt.toFormat('yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' });
        const endTime = data.endAt ? luxon_1.DateTime.fromFormat(data.endAt.toFormat('yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }) : null;
        const quickSchedulePatrol = await QuickSchedulePatrol_1.default.create({
            patrolScheduleId: data.patrolSchedule,
            projectId: data.projectId,
            userId: data.userId,
            startAt: startTime,
            endAt: endTime,
            status: data.status,
        });
        await quickSchedulePatrol.related('checkpoints').createMany(data.checkpoints.map(checkpoint => {
            const createdAtTime = checkpoint.createdAt ? luxon_1.DateTime.fromFormat(checkpoint.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }) : null;
            return { checkpointId: checkpoint.checkpoint, status: checkpoint.status, createdAt: createdAtTime };
        }));
        await quickSchedulePatrol.load('checkpoints');
        return quickSchedulePatrol;
    }
    async update(data, quickSchedulePatrol) {
        await QuickSchedulePatrolCheckpoint_1.default.query().where('quick_schedule_patrol_id', quickSchedulePatrol.id).delete();
        quickSchedulePatrol.status = data.status;
        const endTime = data.endAt ? luxon_1.DateTime.fromFormat(data.endAt.toFormat('yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }) : null;
        quickSchedulePatrol.endAt = endTime;
        await quickSchedulePatrol.save();
        await quickSchedulePatrol.related('checkpoints').createMany(data?.checkpoints?.map(checkpoint => {
            const createdAtTime = checkpoint.createdAt ? luxon_1.DateTime.fromFormat(checkpoint.createdAt.toFormat('yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }) : null;
            return { checkpointId: checkpoint.checkpoint, status: checkpoint.status, createdAt: createdAtTime };
        }) || []);
        await quickSchedulePatrol.load('checkpoints');
        return quickSchedulePatrol;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const startDate = query.startDate;
        const endDate = query.endDate;
        const quickSchedulePatrolQuery = QuickSchedulePatrol_1.default.query().where('project_id', project.id).preload('project', projectQuery => projectQuery.preload('user', userQuery => userQuery.preload('profile')))
            .preload('user', query => query.preload('profile').preload('clientStaff')).preload('checkpoints', cQuery => cQuery.preload('checkpoint'))
            .preload('patrolSchedule')
            .withCount('checkpoints', query => query.where('status', true).as('visited'));
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: 'UTC' });
            quickSchedulePatrolQuery.whereRaw('start_at >= ?', [formattedStartDate.toSQL()]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: 'UTC' });
            quickSchedulePatrolQuery.whereRaw('start_at <= ?', [formattedEndDate.toSQL()]);
        }
        return quickSchedulePatrolQuery.orderBy('created_at', 'desc').orderBy('id', 'desc').paginate(page, limit);
    }
    async list(request, project) {
        const query = request.qs();
        const startDate = query.startDate;
        const endDate = query.endDate;
        const guard = query.guard;
        const patrolSchedule = query.patrolSchedule;
        const status = query.status;
        const quickSchedulePatrolQuery = QuickSchedulePatrol_1.default.query().where('project_id', project.id).preload('project', projectQuery => projectQuery.preload('user', userQuery => userQuery.preload('profile')))
            .preload('user', query => query.preload('profile').preload('clientStaff')).preload('checkpoints', cQuery => cQuery.preload('checkpoint'))
            .preload('patrolSchedule')
            .withCount('checkpoints', query => query.where('status', true).as('visited'));
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: 'UTC' });
            quickSchedulePatrolQuery.whereRaw('start_at >= ?', [formattedStartDate.toSQL()]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: 'UTC' });
            quickSchedulePatrolQuery.whereRaw('start_at <= ?', [formattedEndDate.toSQL()]);
        }
        if (guard) {
            quickSchedulePatrolQuery.where('user_id', guard);
        }
        if (patrolSchedule) {
            if (parseInt(patrolSchedule) === -1) {
                quickSchedulePatrolQuery.whereNull('patrol_schedule_id');
            }
            else {
                quickSchedulePatrolQuery.where('patrol_schedule_id', patrolSchedule);
            }
        }
        if (status && status !== 'ALL') {
            quickSchedulePatrolQuery.where('status', status);
        }
        return quickSchedulePatrolQuery.orderBy('created_at', 'desc').orderBy('id', 'desc').exec();
    }
}
exports.default = QuickSchedulePatrolRepository;
//# sourceMappingURL=QuickSchedulePatrolRepository.js.map