"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ScheduleEntry"));
const luxon_1 = require("luxon");
const UserNotFoundException_1 = __importDefault(require("./../../Exceptions/UserNotFoundException"));
class ScheduleEntryRepository {
    async create(data) {
        const dated = luxon_1.DateTime.fromFormat(data.dated.toFormat('yyyy-MM-dd HH:mm'), 'yyyy-MM-dd HH:mm', { zone: data.timezone }).setZone('UTC');
        const Schedule = await ScheduleEntry_1.default.create({
            audio: data.audio,
            image: data.image,
            message: data.message,
            checkpointId: data.checkpointId,
            scheduleId: data.scheduleId,
            userId: data.userId,
            projectId: data.projectId,
            status: data.status,
            dated: dated
        });
        return Schedule;
    }
    async all(request, projectId) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const order = query.order || 'desc';
        const scheduleId = query.scheduleId;
        const checkpointId = query.checkpointId;
        const startDate = query.startDate;
        const endDate = query.endDate;
        const timezone = query.timezone;
        const guard = query.guard;
        if (startDate || endDate) {
            if (!timezone || !(new luxon_1.IANAZone(timezone).isValid)) {
                throw new UserNotFoundException_1.default('Invalid Timezone!');
            }
        }
        const entryQuery = ScheduleEntry_1.default.query().where('project_id', projectId).preload('schedule', (query) => {
            query.preload('scheduleRoutine');
        }).preload('checkpoint').preload('user', query => query.preload('profile'));
        if (scheduleId) {
            entryQuery.where('schedule_id', scheduleId);
        }
        if (checkpointId) {
            entryQuery.where('checkpoint_id', checkpointId);
        }
        if (guard) {
            entryQuery.where('user_id', guard);
        }
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            entryQuery.whereNotNull('dated').whereRaw('dated >= ?', [formattedStartDate.toSQL()]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            entryQuery.whereNotNull('dated').whereRaw('dated <= ?', [formattedEndDate.toSQL()]);
        }
        if (order) {
            entryQuery.orderBy('dated', order);
        }
        const entries = await entryQuery.paginate(page, limit);
        return entries;
    }
    async findById(id, projectId) {
        const entry = await ScheduleEntry_1.default.query().where('id', id).where('project_id', projectId).preload('schedule', (query) => {
            query.preload('scheduleRoutine');
        }).preload('checkpoint').firstOrFail();
        return entry;
    }
}
exports.default = ScheduleEntryRepository;
//# sourceMappingURL=ScheduleEntryRepository.js.map