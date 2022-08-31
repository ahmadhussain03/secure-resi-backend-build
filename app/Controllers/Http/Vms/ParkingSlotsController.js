"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingSlotRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ParkingSlotRepositoryContract"));
class ParkingSlotsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const parkingSlots = await ParkingSlotRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(parkingSlots);
    }
}
exports.default = ParkingSlotsController;
//# sourceMappingURL=ParkingSlotsController.js.map