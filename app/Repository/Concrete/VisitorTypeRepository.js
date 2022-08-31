"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VisitorType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/VisitorType"));
class VisitorTypeRepository {
    async create(data) {
        const visitorType = await VisitorType_1.default.create(data);
        return visitorType;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const visitorTypeQuery = VisitorType_1.default.query().where('project_id', project.id);
        if (query.type) {
            visitorTypeQuery.where('type', query.type);
        }
        return await visitorTypeQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const visitorType = await this.findById(id, project);
        await visitorType.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const visitorType = await this.findById(id, project);
        visitorType.status = data.status ?? visitorType.status;
        visitorType.type = data.type ?? visitorType.type;
        return await visitorType.save();
    }
    async findById(id, project) {
        const visitorType = await VisitorType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return visitorType;
    }
}
exports.default = VisitorTypeRepository;
//# sourceMappingURL=VisitorTypeRepository.js.map