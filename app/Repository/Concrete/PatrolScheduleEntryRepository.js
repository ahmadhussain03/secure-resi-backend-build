"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const UserNotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/UserNotFoundException"));
const PatrolScheduleEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolScheduleEntry"));
const luxon_1 = require("luxon");
class PatrolScheduleEntryRepository {
    async searchByPatrolScheduleId(request, id, projectId) {
        const query = request.qs();
        const checkpointId = query.checkpointId;
        const guard = query.guard;
        const startDate = query.startDate;
        const endDate = query.endDate;
        const timezone = query.timezone;
        if (startDate || endDate) {
            if (!timezone || !(new luxon_1.IANAZone(timezone).isValid)) {
                throw new UserNotFoundException_1.default('Invalid Timezone!');
            }
        }
        const entriesQuery = PatrolScheduleEntry_1.default.query().where('patrol_schedule_id', id).whereNotNull('dated').where('project_id', projectId).orderBy('created_at', 'desc').preload('checkpoint').preload('user', query => query.preload('profile'));
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            entriesQuery.where('dated', '>=', formattedStartDate.toSQL());
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            entriesQuery.where('dated', '<=', formattedEndDate.toSQL());
        }
        if (checkpointId) {
            entriesQuery.where('checkpoint_id', checkpointId);
        }
        if (guard) {
            entriesQuery.where('user_id', guard);
        }
        const entries = await entriesQuery.exec();
        return entries;
    }
    async create(data) {
        const dated = luxon_1.DateTime.fromFormat(data.dated.toFormat('yyyy-MM-dd HH:mm'), 'yyyy-MM-dd HH:mm', { zone: data.timezone }).setZone('UTC');
        const PatrolSchedule = await PatrolScheduleEntry_1.default.create({
            message: data.message,
            audio: data.audio,
            image: data.image,
            checkpointId: data.checkpointId,
            patrolScheduleId: data.patrolScheduleId,
            userId: data.userId,
            projectId: data.projectId,
            status: data.status,
            dated: dated
        });
        return PatrolSchedule;
    }
    async all(request, projectId) {
        const query = request.qs();
        const patrolScheduleId = query.patrolScheduleId;
        const guard = query.guard;
        const startDate = query.startDate;
        const endDate = query.endDate;
        const timezone = query.timezone;
        if (startDate || endDate) {
            if (!timezone || !(new luxon_1.IANAZone(timezone).isValid)) {
                throw new UserNotFoundException_1.default('Invalid Timezone!');
            }
        }
        const patrolEntryQuery = PatrolScheduleEntry_1.default.query().select('patrol_schedule_id', Database_1.default.raw('DATE(dated) as created_at'), 'userId').where('project_id', projectId).groupBy(['patrol_schedule_id', 'user_id']).whereNotNull('dated').groupByRaw('DATE(dated)').orderByRaw("DATE(dated) DESC").preload('patrolSchedule').preload('user');
        if (patrolScheduleId) {
            patrolEntryQuery.where('patrol_schedule_id', patrolScheduleId);
        }
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            patrolEntryQuery.whereRaw('dated >= ?', [formattedStartDate.toSQL()]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            patrolEntryQuery.whereRaw('dated <= ?', [formattedEndDate.toSQL()]);
        }
        if (guard) {
            patrolEntryQuery.where('user_id', guard);
        }
        const patrolEntries = await patrolEntryQuery.exec();
        return patrolEntries;
    }
    async findById(id, projectId) {
        const entry = await PatrolScheduleEntry_1.default.query().where('id', id).where('project_id', projectId).preload('patrolSchedule', (query) => {
            query.preload('patrolScheduleRoutine');
        }).preload('checkpoint').firstOrFail();
        return entry;
    }
}
exports.default = PatrolScheduleEntryRepository;
//# sourceMappingURL=PatrolScheduleEntryRepository.js.map