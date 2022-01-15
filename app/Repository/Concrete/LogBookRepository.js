"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogBook_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/LogBook"));
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
const LogTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LogTypeRepositoryContract"));
const luxon_1 = require("luxon");
const UserNotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/UserNotFoundException"));
class LogBookRepository {
    async create(data) {
        const project = await Project_1.default.findByOrFail('id', data.projectId);
        const logType = await LogTypeRepositoryContract_1.default.findById(data.logTypeId, project);
        const dated = luxon_1.DateTime.fromFormat(data.dated.toFormat('yyyy-MM-dd HH:mm'), 'yyyy-MM-dd HH:mm', { zone: data.timezone }).setZone('UTC');
        const log = await LogBook_1.default.create({
            log: data.log,
            projectId: data.projectId,
            userId: data.userId,
            logTypeId: logType.id,
            image: data.image ? data.image : null,
            audio: data.audio ? data.audio : null,
            status: logType.status,
            dated: dated
        });
        await log.load('logType');
        return log;
    }
    async all(request, project) {
        const query = request.qs();
        const order = query.order || 'desc';
        const logTypeId = query.logTypeId;
        const startDate = query.startDate;
        const endDate = query.endDate;
        const timezone = query.timezone;
        const search = query.search;
        if (startDate || endDate) {
            if (!timezone || !(new luxon_1.IANAZone(timezone).isValid)) {
                throw new UserNotFoundException_1.default('Invalid Timezone!');
            }
        }
        const logQuery = LogBook_1.default.query().where('project_id', project.id).whereNotNull('dated').preload('logType').preload('user', (query) => query.preload('profile'));
        if (order) {
            logQuery.orderBy('created_at', order);
        }
        if (search) {
            logQuery.where('status', 'like', `%${search}%`).orWhere('log', 'like', `%${search}%`);
        }
        if (logTypeId) {
            logQuery.where('log_type_id', logTypeId);
        }
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            logQuery.whereRaw('dated >= ?', [formattedStartDate.toSQL()]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            logQuery.whereRaw('dated <= ?', [formattedEndDate.toSQL()]);
        }
        const logs = await logQuery.exec();
        return logs;
    }
    async findById(id, project) {
        const log = await LogBook_1.default.query().where('project_id', project.id).where('id', id).firstOrFail();
        return log;
    }
    async destroyById(id, project) {
        const log = await this.findById(id, project);
        await log.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const log = await this.findById(id, project);
        log.log = data.log ? data.log : log.log;
        if (data.logTypeId && data.logTypeId != data.logTypeId) {
            const logType = await LogTypeRepositoryContract_1.default.findById(data.logTypeId, project);
            log.logTypeId = logType.id;
            await log.load('logType');
        }
        log.image = data.image ? data.image : log.image;
        log.audio = data.audio ? data.audio : log.audio;
        log.status = data.status ? data.status : log.status;
        await log.save();
        return log;
    }
}
exports.default = LogBookRepository;
//# sourceMappingURL=LogBookRepository.js.map