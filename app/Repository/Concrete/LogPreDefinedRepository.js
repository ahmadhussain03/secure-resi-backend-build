"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogPreDefinedMessage_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/LogPreDefinedMessage"));
class LogPreDefinedRepository {
    async findById(id, project) {
        const logPreDefinedMessage = await LogPreDefinedMessage_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return logPreDefinedMessage;
    }
    async findByIdAndUpdate(id, data, project) {
        const logPreDefinedMessage = await this.findById(id, project);
        logPreDefinedMessage.message = data.message ? data.message : logPreDefinedMessage.message;
        await logPreDefinedMessage.save();
        return logPreDefinedMessage;
    }
    async destroyById(id, project) {
        const logPreDefinedMessage = await this.findById(id, project);
        await logPreDefinedMessage?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page;
        const limit = query.limit;
        return await LogPreDefinedMessage_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await LogPreDefinedMessage_1.default.create({
            message: data.message,
            projectId: data.projectId
        });
    }
}
exports.default = LogPreDefinedRepository;
//# sourceMappingURL=LogPreDefinedRepository.js.map