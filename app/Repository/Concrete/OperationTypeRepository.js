"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OperationType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/OperationType"));
class OperationTypeRepository {
    async findById(id, project) {
        const operationType = await OperationType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return operationType;
    }
    async findByIdAndUpdate(id, data, project) {
        const operationType = await OperationType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        operationType.name = data.name ? data.name : operationType.name;
        operationType.status = data.status ? data.status : operationType.status;
        operationType.statusOne = data.statusOne ? data.statusOne : operationType.statusOne;
        operationType.statusTwo = data.statusTwo ? data.statusTwo : operationType.statusTwo;
        await operationType.save();
        return operationType;
    }
    async destroyById(id, project) {
        const operationType = await OperationType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        await operationType?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page;
        const limit = query.limit;
        return await OperationType_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await OperationType_1.default.create({
            name: data.name,
            projectId: data.projectId,
            status: data.status,
            statusOne: data.statusOne,
            statusTwo: data.statusTwo
        });
    }
}
exports.default = OperationTypeRepository;
//# sourceMappingURL=OperationTypeRepository.js.map