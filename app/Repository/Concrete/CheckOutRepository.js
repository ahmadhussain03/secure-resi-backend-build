"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckOut_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/CheckOut"));
const CheckIn_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/CheckIn"));
const luxon_1 = require("luxon");
class CheckOutRepository {
    async create(data) {
        const checkIn = await CheckIn_1.default.query().where('id', data.checkInId).preload('visitorPlan').firstOrFail();
        const checkOut = await CheckOut_1.default.create({
            stayDuration: data.stayDuration,
            overstayTime: data.overstayTime,
            balance: data.balance,
            discount: data.discount,
            paid: data.paid,
            overstayPenalty: data.overstayPenalty,
            checkInId: data.checkInId,
            projectId: data.projectId,
            userId: data.userId,
            gateTerminalId: data.gateTerminalId,
        });
        checkIn.checkOutAt = luxon_1.DateTime.now();
        await checkIn.save();
        await checkIn.related('visitorPlan').query().update({ status: 'Checked-Out' });
        return checkOut;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const CheckOutQuery = CheckOut_1.default.query().where('project_id', project.id).preload('checkIn', query => query.preload('parkingSlot').preload('visitorPlan', q => q.preload('unit').preload('visitorType').preload('visitors').preload('user', uQ => uQ.preload('profile'))));
        return CheckOutQuery.paginate(page, limit);
    }
    async findById(id, project) {
        const checkOut = await CheckOut_1.default.query().where('id', id).where('project_id', project.id).preload('user').firstOrFail();
        return checkOut;
    }
}
exports.default = CheckOutRepository;
//# sourceMappingURL=CheckOutRepository.js.map