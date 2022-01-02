"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolPreDefinedMessage_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolPreDefinedMessage"));
class PatrolPreDefinedRepository {
    async findById(id, project) {
        const patrolPreDefinedMessage = await PatrolPreDefinedMessage_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return patrolPreDefinedMessage;
    }
    async findByIdAndUpdate(id, data, project) {
        const patrolPreDefinedMessage = await this.findById(id, project);
        patrolPreDefinedMessage.message = data.message ? data.message : patrolPreDefinedMessage.message;
        await patrolPreDefinedMessage.save();
        return patrolPreDefinedMessage;
    }
    async destroyById(id, project) {
        const PatrolPreDefinedMessage = await this.findById(id, project);
        await PatrolPreDefinedMessage?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        return await PatrolPreDefinedMessage_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await PatrolPreDefinedMessage_1.default.create({
            message: data.message,
            projectId: data.projectId
        });
    }
}
exports.default = PatrolPreDefinedRepository;
//# sourceMappingURL=PatrolPreDefinedRepository.js.map