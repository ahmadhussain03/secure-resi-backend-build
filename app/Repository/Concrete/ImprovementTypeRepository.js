"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImprovementType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ImprovementType"));
class ImprovementTypeRepository {
    async findById(id, project) {
        const improvementType = await ImprovementType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return improvementType;
    }
    async findByIdAndUpdate(id, data, project) {
        const improvementType = await ImprovementType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        improvementType.name = data.name ? data.name : improvementType.name;
        await improvementType.save();
        return improvementType;
    }
    async destroyById(id, project) {
        const operationType = await ImprovementType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        await operationType?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page;
        const limit = query.limit;
        return await ImprovementType_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await ImprovementType_1.default.create({
            name: data.name,
            projectId: data.projectId
        });
    }
}
exports.default = ImprovementTypeRepository;
//# sourceMappingURL=ImprovementTypeRepository.js.map