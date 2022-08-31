"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatePassType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GatePassType"));
class GatePassTypeRepository {
    async create(data) {
        const gatePassType = await GatePassType_1.default.create(data);
        return gatePassType;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const gatePassTypeQuery = GatePassType_1.default.query().where('project_id', project.id);
        return await gatePassTypeQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const gatePassType = await this.findById(id, project);
        await gatePassType.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const gatePassType = await this.findById(id, project);
        gatePassType.customGatePassType = data.customGatePassType ?? gatePassType.customGatePassType;
        gatePassType.personalGatePassAvailableInCheckin = data.personalGatePassAvailableInCheckin ?? gatePassType.personalGatePassAvailableInCheckin;
        gatePassType.vehicleGatePassAvailableInCheckin = data.vehicleGatePassAvailableInCheckin ?? gatePassType.vehicleGatePassAvailableInCheckin;
        gatePassType.status = data.status ?? gatePassType.status;
        return await gatePassType.save();
    }
    async findById(id, project) {
        const gatePassType = await GatePassType_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return gatePassType;
    }
}
exports.default = GatePassTypeRepository;
//# sourceMappingURL=GatePassTypeRepository.js.map