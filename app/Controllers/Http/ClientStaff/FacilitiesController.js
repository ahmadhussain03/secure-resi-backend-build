"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FacilityRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/FacilityRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Fcm_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Fcm"));
class FacilitiesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const facilities = await FacilityRepositoryContract_1.default.allByProject(request, project);
        return response.json(facilities);
    }
    async update({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const improvementSchema = Validator_1.schema.create({
            status: Validator_1.schema.enum(['Pending', 'Processing', 'Approved', 'Completed', 'Rejected']),
        });
        const validatedData = await request.validate({ schema: improvementSchema });
        const { id } = request.params();
        const move = await FacilityRepositoryContract_1.default.findByIdByProjectAndUpdate(id, project, validatedData);
        if (move?.user?.deviceToken) {
            Fcm_1.default.sendNotification(move?.user?.deviceToken, {
                payload: {
                    notification: {
                        title: 'Facilties',
                        body: `Facility Status Updated to ${move.status}`
                    },
                    data: {
                        type: 'facility'
                    }
                }
            });
        }
        return response.json(move);
    }
}
exports.default = FacilitiesController;
//# sourceMappingURL=FacilitiesController.js.map