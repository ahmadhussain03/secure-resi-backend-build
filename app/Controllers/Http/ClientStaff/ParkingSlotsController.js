"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingSlotRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ParkingSlotRepositoryContract"));
const CreateParkingSlotValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateParkingSlotValidator"));
const UpdateParkingSlotValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateParkingSlotValidator"));
class ParkingSlotsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const parkingSlots = await ParkingSlotRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(parkingSlots);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateParkingSlotValidator_1.default);
        data.projectId = projectId;
        const parkingSlot = await ParkingSlotRepositoryContract_1.default.create(data);
        return response.json(parkingSlot);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateParkingSlotValidator_1.default);
        const authUser = auth.user;
        const parkingSlot = await ParkingSlotRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(parkingSlot);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const parkingSlot = await ParkingSlotRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(parkingSlot);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await ParkingSlotRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Parking Slot Deleted Successfully" });
    }
}
exports.default = ParkingSlotsController;
//# sourceMappingURL=ParkingSlotsController.js.map