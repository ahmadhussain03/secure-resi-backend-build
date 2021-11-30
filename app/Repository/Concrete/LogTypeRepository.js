"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/LogType"));
class LogTypeRepository {
    async findById(id, project) {
        const logType = await LogType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return logType;
    }
    async findByIdAndUpdate(id, data, project) {
        const logType = await LogType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        logType.name = data.name ? data.name : logType.name;
        logType.status = data.status ? data.status : logType.status;
        logType.statusOne = data.statusOne ? data.statusOne : logType.statusOne;
        logType.statusTwo = data.statusTwo ? data.statusTwo : logType.statusTwo;
        await logType.save();
        return logType;
    }
    async destroyById(id, project) {
        const logType = await LogType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        await logType?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page;
        const limit = query.limit;
        return await LogType_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await LogType_1.default.create({
            name: data.name,
            projectId: data.projectId,
            status: data.status,
            statusOne: data.statusOne,
            statusTwo: data.statusTwo
        });
    }
}
exports.default = LogTypeRepository;
//# sourceMappingURL=LogTypeRepository.js.map