"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingLevelRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ParkingLevelRepositoryContract"));
const CreateParkingLevelValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateParkingLevelValidator"));
const UpdateParkingLevelValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateParkingLevelValidator"));
class ParkingLevelsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const parkingLevels = await ParkingLevelRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(parkingLevels);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateParkingLevelValidator_1.default);
        data.projectId = projectId;
        const parkingLevel = await ParkingLevelRepositoryContract_1.default.create(data);
        return response.json(parkingLevel);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateParkingLevelValidator_1.default);
        const authUser = auth.user;
        const parkingLevel = await ParkingLevelRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(parkingLevel);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const parkingLevel = await ParkingLevelRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(parkingLevel);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await ParkingLevelRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Parking Level Deleted Successfully" });
    }
}
exports.default = ParkingLevelsController;
//# sourceMappingURL=ParkingLevelsController.js.map