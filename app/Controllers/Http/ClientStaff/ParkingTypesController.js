"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ParkingTypeRepositoryContract"));
const CreateParkingTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateParkingTypeValidator"));
const UpdateParkingTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateParkingTypeValidator"));
class ParkingTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const parkingTypes = await ParkingTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(parkingTypes);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateParkingTypeValidator_1.default);
        data.projectId = projectId;
        const parkingType = await ParkingTypeRepositoryContract_1.default.create(data);
        return response.json(parkingType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateParkingTypeValidator_1.default);
        const authUser = auth.user;
        const parkingType = await ParkingTypeRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(parkingType);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const parkingType = await ParkingTypeRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(parkingType);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await ParkingTypeRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Parking Type Deleted Successfully" });
    }
}
exports.default = ParkingTypesController;
//# sourceMappingURL=ParkingTypesController.js.map