"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolEntry_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolEntry"));
const luxon_1 = require("luxon");
const UserNotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/UserNotFoundException"));
class PatrolEntryRepository {
    async create(data) {
        const dated = luxon_1.DateTime.fromFormat(data.dated.toFormat('yyyy-MM-dd HH:mm'), 'yyyy-MM-dd HH:mm', { zone: data.timezone }).setZone('UTC');
        const patrolEntry = await PatrolEntry_1.default.create({
            audio: data.audio,
            checkpointId: data.checkpointId,
            image: data.image,
            message: data.message,
            projectId: data.projectId,
            userId: data.userId,
            dated: dated
        });
        return patrolEntry;
    }
    async all(request, projectId) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
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
        const patrolEntryQuery = PatrolEntry_1.default.query().where('project_id', projectId).whereNotNull('dated');
        if (checkpointId) {
            patrolEntryQuery.where('checkpoint_id', checkpointId);
        }
        if (guard) {
            patrolEntryQuery.where('user_id', guard);
        }
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            patrolEntryQuery.whereRaw('dated >= ?', [formattedStartDate.toSQL()]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            patrolEntryQuery.whereRaw('dated <= ?', [formattedEndDate.toSQL()]);
        }
        const patrolEntries = await patrolEntryQuery.preload('checkpoint').preload('user', (query) => query.preload('profile')).orderBy('created_at', 'desc').paginate(page, limit);
        return patrolEntries;
    }
    async findById(id, projectId) {
        const entry = await PatrolEntry_1.default.query().where('id', id).where('project_id', projectId).firstOrFail();
        return entry;
    }
}
exports.default = PatrolEntryRepository;
//# sourceMappingURL=PatrolEntryRepository.js.map