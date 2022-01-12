"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuardOperation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GuardOperation"));
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
const OperationTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/OperationTypeRepositoryContract"));
const luxon_1 = require("luxon");
const UserNotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/UserNotFoundException"));
class GuardOperationRepository {
    async create(data) {
        const project = await Project_1.default.findByOrFail('id', data.projectId);
        const operationType = await OperationTypeRepositoryContract_1.default.findById(data.operationTypeId, project);
        const dated = luxon_1.DateTime.fromFormat(data.dated.toFormat('yyyy-MM-dd HH:mm'), 'yyyy-MM-dd HH:mm', { zone: data.timezone }).setZone('UTC');
        const operation = await GuardOperation_1.default.create({
            operation: data.operation,
            projectId: data.projectId,
            userId: data.userId,
            operationTypeId: operationType.id,
            image: data.image ? data.image : null,
            audio: data.audio ? data.audio : null,
            status: operationType.status,
            dated: dated
        });
        await operation.load('operationType');
        return operation;
    }
    async all(request, project) {
        const query = request.qs();
        const order = query.order || 'desc';
        const operationTypeId = query.operationTypeId;
        const startDate = query.startDate;
        const endDate = query.endDate;
        const timezone = query.timezone;
        const search = query.search;
        if (startDate || endDate) {
            if (!timezone || !(new luxon_1.IANAZone(timezone).isValid)) {
                throw new UserNotFoundException_1.default('Invalid Timezone!');
            }
        }
        const operationQuery = GuardOperation_1.default.query().where('project_id', project.id).whereNotNull('dated').preload('operationType').preload('user', (query) => query.preload('profile'));
        if (order) {
            operationQuery.orderBy('created_at', order);
        }
        if (search) {
            operationQuery.where('status', 'like', `%${search}%`);
        }
        if (operationTypeId) {
            operationQuery.where('operation_type_id', operationTypeId);
        }
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            operationQuery.whereRaw('dated >= ?', [formattedStartDate.toSQL()]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd HH:mm', { zone: timezone }).toUTC();
            operationQuery.whereRaw('dated <= ?', [formattedEndDate.toSQL()]);
        }
        const operations = await operationQuery.exec();
        return operations;
    }
    async findById(id, project) {
        const operation = await GuardOperation_1.default.query().where('project_id', project.id).where('id', id).preload('operationType').firstOrFail();
        return operation;
    }
    async destroyById(id, project) {
        const operation = await this.findById(id, project);
        await operation.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const operation = await this.findById(id, project);
        operation.operation = data.operation ? data.operation : operation.operation;
        if (data.operationTypeId && data.operationTypeId != operation.operationTypeId) {
            const operationType = await OperationTypeRepositoryContract_1.default.findById(data.operationTypeId, project);
            operation.operationTypeId = operationType.id;
            await operation.load('operationType');
        }
        operation.image = data.image ? data.image : operation.image;
        operation.audio = data.audio ? data.audio : operation.audio;
        operation.status = data.status ? data.status : operation.status;
        await operation.save();
        return operation;
    }
}
exports.default = GuardOperationRepository;
//# sourceMappingURL=GuardOperationRepository.js.map