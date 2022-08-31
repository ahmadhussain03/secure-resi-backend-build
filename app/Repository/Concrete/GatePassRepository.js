"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatePassTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GatePassTypeRepositoryContract"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
const GatePass_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GatePass"));
const GatePassType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GatePassType"));
const qrcode_1 = __importDefault(require("qrcode"));
class GatePassRepository {
    async findByPassNumber(passNumber, project) {
        const gatePass = await GatePass_1.default.query().where('pass_number', passNumber).where('project_id', project.id).firstOrFail();
        return gatePass;
    }
    async create(data) {
        await GatePassType_1.default.query().where('id', data.gatePassTypeId).where('project_id', data.projectId).firstOrFail();
        const gatePass = await GatePass_1.default.create(data);
        await Drive_1.default.put(`gate_pass_code/${data.passNumber}.jpg`, await qrcode_1.default.toBuffer(data.passNumber));
        return gatePass;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const gatePassQuery = GatePass_1.default.query().where('project_id', project.id).preload('gatePassType');
        if (query.gatePassTypeId) {
            gatePassQuery.where('gate_pass_type_id', query.gatePassTypeId);
        }
        return await gatePassQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const gatePass = await this.findById(id, project);
        await gatePass.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const gatePass = await this.findById(id, project);
        gatePass.passNumber = data.passNumber ?? gatePass.passNumber;
        gatePass.status = data.status ?? gatePass.status;
        if (data.gatePassTypeId) {
            const gatePassTypeId = await GatePassTypeRepositoryContract_1.default.findById(data.gatePassTypeId, project);
            gatePass.gatePassTypeId = gatePassTypeId.id;
        }
        if (data.passNumber) {
            await Drive_1.default.put(`gate_pass_code/${data.passNumber}.jpg`, await qrcode_1.default.toBuffer(data.passNumber));
        }
        return await gatePass.save();
    }
    async findById(id, project) {
        const gatePass = await GatePass_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return gatePass;
    }
}
exports.default = GatePassRepository;
//# sourceMappingURL=GatePassRepository.js.map