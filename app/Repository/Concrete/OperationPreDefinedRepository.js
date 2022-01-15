"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OperationPreDefinedMessage_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/OperationPreDefinedMessage"));
class OperationPreDefinedRepository {
    async findById(id, project) {
        const operationPreDefinedMessage = await OperationPreDefinedMessage_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return operationPreDefinedMessage;
    }
    async findByIdAndUpdate(id, data, project) {
        const operationPreDefinedMessage = await this.findById(id, project);
        operationPreDefinedMessage.message = data.message ? data.message : operationPreDefinedMessage.message;
        await operationPreDefinedMessage.save();
        return operationPreDefinedMessage;
    }
    async destroyById(id, project) {
        const operationPreDefinedMessage = await this.findById(id, project);
        await operationPreDefinedMessage?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const search = query.search || null;
        const messageQuery = OperationPreDefinedMessage_1.default.query().where('project_id', project.id);
        if (search) {
            messageQuery.where('message', 'like', `%${search}%`);
        }
        return await messageQuery.paginate(page, limit);
    }
    async create(data) {
        return await OperationPreDefinedMessage_1.default.create({
            message: data.message,
            projectId: data.projectId
        });
    }
}
exports.default = OperationPreDefinedRepository;
//# sourceMappingURL=OperationPreDefinedRepository.js.map