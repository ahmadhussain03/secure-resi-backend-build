"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FacilityTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/FacilityTypeRepositoryContract"));
class FacilityTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const facilityType = await FacilityTypeRepositoryContract_1.default.all(request, authUser.resident.project);
        return response.json(facilityType);
    }
}
exports.default = FacilityTypesController;
//# sourceMappingURL=FacilityTypesController.js.map