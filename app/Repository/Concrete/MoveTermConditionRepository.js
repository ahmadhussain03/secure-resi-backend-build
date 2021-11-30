"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoveTermCondition_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/MoveTermCondition"));
class MoveTermConditionRepository {
    async findById(id, project) {
        const termCondition = await MoveTermCondition_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return termCondition;
    }
    async findByIdAndUpdate(id, data, project) {
        const termCondition = await MoveTermCondition_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        termCondition.description = data.description ? data.description : termCondition.description;
        await termCondition.save();
        return termCondition;
    }
    async destroyById(id, project) {
        const TermCondition = await MoveTermCondition_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        await TermCondition?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page ?? 1;
        const limit = query.limit ?? 15;
        return await MoveTermCondition_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await MoveTermCondition_1.default.create({
            description: data.description,
            projectId: data.projectId
        });
    }
}
exports.default = MoveTermConditionRepository;
//# sourceMappingURL=MoveTermConditionRepository.js.map