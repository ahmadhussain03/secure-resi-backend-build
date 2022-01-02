"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FacilityType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/FacilityType"));
class FacilityTypeRepository {
    async findById(id, project) {
        const facilityType = await FacilityType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return facilityType;
    }
    async findByIdAndUpdate(id, data, project) {
        const facilityType = await FacilityType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        facilityType.type = data.type ? data.type : facilityType.type;
        await facilityType.save();
        return facilityType;
    }
    async destroyById(id, project) {
        const facilityType = await FacilityType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        await facilityType?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        return await FacilityType_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await FacilityType_1.default.create({
            type: data.type,
            projectId: data.projectId
        });
    }
}
exports.default = FacilityTypeRepository;
//# sourceMappingURL=FacilityTypeRepository.js.map