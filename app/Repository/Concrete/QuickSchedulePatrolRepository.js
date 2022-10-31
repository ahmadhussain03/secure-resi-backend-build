"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSchedulePatrol_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/QuickSchedulePatrol"));
const QuickSchedulePatrolCheckpoint_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/QuickSchedulePatrolCheckpoint"));
class QuickSchedulePatrolRepository {
    async create(data) {
        const quickSchedulePatrol = await QuickSchedulePatrol_1.default.create({
            patrolScheduleId: data.patrolSchedule,
            projectId: data.projectId,
            userId: data.userId,
            startAt: data.startAt,
            endAt: data.endAt,
            status: data.status,
        });
        await quickSchedulePatrol.related('checkpoints').createMany(data.checkpoints.map(checkpoint => ({ checkpointId: checkpoint.checkpoint, status: checkpoint.status })));
        await quickSchedulePatrol.load('checkpoints');
        return quickSchedulePatrol;
    }
    async update(data, quickSchedulePatrol) {
        await QuickSchedulePatrolCheckpoint_1.default.query().where('quick_schedule_patrol_id', quickSchedulePatrol.id).delete();
        await quickSchedulePatrol.related('checkpoints').createMany(data?.checkpoints?.map(checkpoint => ({ checkpointId: checkpoint.checkpoint, status: checkpoint.status })) || []);
        await quickSchedulePatrol.load('checkpoints');
        return quickSchedulePatrol;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const quickSchedulePatrolQuery = QuickSchedulePatrol_1.default.query().where('project_id', project.id).preload('project', projectQuery => projectQuery.preload('user', userQuery => userQuery.preload('profile')))
            .preload('user', query => query.preload('profile').preload('clientStaff')).preload('checkpoints', cQuery => cQuery.preload('checkpoint'))
            .preload('patrolSchedule')
            .withCount('checkpoints', query => query.where('status', true).as('visited'));
        return quickSchedulePatrolQuery.orderBy('created_at', 'desc').orderBy('id', 'desc').paginate(page, limit);
    }
}
exports.default = QuickSchedulePatrolRepository;
//# sourceMappingURL=QuickSchedulePatrolRepository.js.map