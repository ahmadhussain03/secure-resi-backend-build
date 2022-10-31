"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckIn_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/CheckIn"));
class CheckInRepository {
    async create(data) {
        const checkIn = await CheckIn_1.default.create({
            parkingSlotId: data.parkingSlotId,
            payableAmount: data.payableAmount,
            personalGatePassId: data.personalGatePassId,
            vehicleGatePassId: data.vehicleGatePassId,
            userId: data.userId,
            projectId: data.projectId,
            visitorPlanId: data.visitorPlanId
        });
        return checkIn;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const checkInQuery = CheckIn_1.default.query().where('project_id', project.id).preload('parkingSlot').preload('visitorPlan', query => query.preload('visitorType').preload('user', q => q.preload('profile')).preload('unit').preload('visitors'));
        return checkInQuery.paginate(page, limit);
    }
    async findById(id, project) {
        const checkIn = await CheckIn_1.default.query().where('id', id).where('project_id', project.id).preload('visitorPlan', query => query.preload('visitors').preload('unit')).preload('parkingSlot').preload('personalGatePass').preload('vehicleGatePass').preload('user').firstOrFail();
        return checkIn;
    }
}
exports.default = CheckInRepository;
//# sourceMappingURL=CheckInRepository.js.map