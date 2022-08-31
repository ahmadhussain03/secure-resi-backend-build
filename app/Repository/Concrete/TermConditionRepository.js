"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TermCondition_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/TermCondition"));
class TermConditionRepository {
    async create(data) {
        const terms = await TermCondition_1.default.first();
        if (terms) {
            terms.description = data.description;
            await terms.save();
            return terms;
        }
        else {
            return await TermCondition_1.default.create({
                description: data.description,
                projectId: data.projectId
            });
        }
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        return await TermCondition_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
}
exports.default = TermConditionRepository;
//# sourceMappingURL=TermConditionRepository.js.map