"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckpointRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/CheckpointRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class NearByCheckpointsController {
    async index({ response, request, auth }) {
        const nearbySchema = Validator_1.schema.create({
            longitude: Validator_1.schema.number(),
            latitude: Validator_1.schema.number(),
        });
        const data = await request.validate({ schema: nearbySchema });
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const checkpoint = await CheckpointRepositoryContract_1.default.findByLatLong(data.latitude, data.longitude, project);
        return response.json(checkpoint);
    }
}
exports.default = NearByCheckpointsController;
//# sourceMappingURL=NearByCheckpointsController.js.map