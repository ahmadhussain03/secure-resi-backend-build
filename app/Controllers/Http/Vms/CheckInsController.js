"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatePassRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GatePassRepositoryContract"));
const ParkingSlotRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ParkingSlotRepositoryContract"));
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const CheckInRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/CheckInRepositoryContract"));
const VisitorPlanRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/VisitorPlanRepositoryContract"));
const CreateCheckInValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Vms/CreateCheckInValidator"));
class CheckInsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const checkIns = await CheckInRepositoryContract_1.default.all(request, project);
        return response.json(checkIns);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateCheckInValidator_1.default);
        const checkInData = data;
        checkInData.userId = authUser.id;
        checkInData.projectId = project.id;
        if (data.parkingSlot) {
            const parkingSlot = await ParkingSlotRepositoryContract_1.default.findById(data.parkingSlot, project);
            checkInData.parkingSlotId = parkingSlot.id;
        }
        if (data.personalGatePass) {
            const gatePass = await GatePassRepositoryContract_1.default.findByPassNumber(data.personalGatePass, project);
            checkInData.personalGatePassId = gatePass.id;
        }
        if (data.vehicleGatePass) {
            const gatePass = await GatePassRepositoryContract_1.default.findByPassNumber(data.vehicleGatePass, project);
            checkInData.vehicleGatePassId = gatePass.id;
        }
        if (data.planId) {
            const visitorPlan = await VisitorPlanRepositoryContract_1.default.findByIdByProject(data.planId, project);
            checkInData.visitorPlanId = visitorPlan.id;
            const checkIn = await CheckInRepositoryContract_1.default.create(checkInData);
            return response.json(checkIn);
        }
        else {
            const planData = data;
            const unit = await UnitRepositoryContract_1.default.findById(planData.unitId, project);
            planData.projectId = project.id;
            planData.userId = authUser.id;
            planData.unitId = unit.id;
            const visitorPlan = await VisitorPlanRepositoryContract_1.default.create(planData);
            checkInData.visitorPlanId = visitorPlan.id;
            const checkIn = await CheckInRepositoryContract_1.default.create(checkInData);
            return response.json(checkIn);
        }
    }
}
exports.default = CheckInsController;
//# sourceMappingURL=CheckInsController.js.map