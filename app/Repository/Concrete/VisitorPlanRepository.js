"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VisitorPlan_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/VisitorPlan"));
class VisitorPlanRepository {
    async create(data) {
        const planVisit = await VisitorPlan_1.default.create({
            visitorEntry: data.visitorEntry,
            visitorType: data.visitorType,
            seniors: data.seniors,
            adults: data.adults,
            children: data.children,
            infants: data.infants,
            arrivalTime: data.arrivalTime,
            exitTime: data.exitTime,
            purposeOfVisit: data.purposeOfVisit,
            noOfDays: data.noOfDays,
            vehicleType: data.vehicleType,
            vehiclePlateNumber: data.vehiclePlateNumber,
            userId: data.userId,
            projectId: data.projectId,
            unitId: data.unitId
        });
        await planVisit.related('visitors').attach(data.visitors);
        await planVisit.load('visitors');
        return planVisit;
    }
    async allByUnit(request, unit) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const visitorsQuery = VisitorPlan_1.default.query().preload('visitors').where('unit_id', unit.id);
        const visitors = await visitorsQuery.paginate(page, limit);
        return visitors;
    }
    async destroyByIdByUnit(id, unit) {
        const visitor = await this.findByIdByUnit(id, unit);
        await visitor.delete();
        return true;
    }
    async findByIdByUnitAndUpdate(id, unit, data) {
        const visitorPlan = await this.findByIdByUnit(id, unit);
        visitorPlan.visitorEntry = data.visitorEntry ?? visitorPlan.visitorEntry;
        visitorPlan.visitorType = data.visitorType ?? visitorPlan.visitorType;
        visitorPlan.seniors = data.seniors ?? visitorPlan.seniors;
        visitorPlan.adults = data.adults ?? visitorPlan.adults;
        visitorPlan.children = data.children ?? visitorPlan.children;
        visitorPlan.infants = data.infants ?? visitorPlan.infants;
        visitorPlan.exitTime = data.exitTime ?? visitorPlan.exitTime;
        visitorPlan.arrivalTime = data.arrivalTime ?? visitorPlan.arrivalTime;
        visitorPlan.purposeOfVisit = data.purposeOfVisit ?? visitorPlan.purposeOfVisit;
        visitorPlan.noOfDays = data.noOfDays ?? visitorPlan.noOfDays;
        visitorPlan.vehicleType = data.vehicleType ?? visitorPlan.vehicleType;
        visitorPlan.vehiclePlateNumber = data.vehiclePlateNumber ?? visitorPlan.vehiclePlateNumber;
        await visitorPlan.save();
        if (data.visitors)
            await visitorPlan.related('visitors').attach(data.visitors);
        return visitorPlan;
    }
    async findByIdByUnit(id, unit) {
        const visitorPlan = await VisitorPlan_1.default.query().preload('visitors').where('unit_id', unit.id).where('id', id).firstOrFail();
        return visitorPlan;
    }
}
exports.default = VisitorPlanRepository;
//# sourceMappingURL=VisitorPlanRepository.js.map