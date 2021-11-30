"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImprovementRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ImprovementRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Fcm_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Fcm"));
class ImprovementsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const improvements = await ImprovementRepositoryContract_1.default.allByProduct(request, project);
        return response.json(improvements);
    }
    async update({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const improvementSchema = Validator_1.schema.create({
            status: Validator_1.schema.enum(['Pending', 'Processing', 'Approved', 'Completed', 'Rejected']),
        });
        const validatedData = await request.validate({ schema: improvementSchema });
        const { id } = request.params();
        const improvement = await ImprovementRepositoryContract_1.default.findByIdByProjectAndUpdate(id, project, validatedData);
        if (improvement?.user?.deviceToken) {
            Fcm_1.default.sendNotification(improvement?.user?.deviceToken, {
                payload: {
                    notification: {
                        title: 'Improvement',
                        body: `Improvement Status Updated to ${improvement.status}`
                    },
                    data: {
                        type: 'improvement'
                    }
                }
            });
        }
        return response.json(improvement);
    }
}
exports.default = ImprovementsController;
//# sourceMappingURL=ImprovementsController.js.map