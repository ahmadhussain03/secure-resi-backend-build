"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoveRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/MoveRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Fcm_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Fcm"));
class MovesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const moves = await MoveRepositoryContract_1.default.allByProject(request, project);
        return response.json(moves);
    }
    async update({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const improvementSchema = Validator_1.schema.create({
            status: Validator_1.schema.enum(['Pending', 'Processing', 'Approved', 'Completed', 'Rejected']),
        });
        const validatedData = await request.validate({ schema: improvementSchema });
        const { id } = request.params();
        const move = await MoveRepositoryContract_1.default.findByIdByProjectAndUpdate(id, project, validatedData);
        if (move?.user?.deviceToken) {
            Fcm_1.default.sendNotification(move?.user?.deviceToken, {
                payload: {
                    notification: {
                        title: 'Move In/Out',
                        body: `Move Status Updated to ${move.status}`
                    },
                    data: {
                        type: 'move'
                    }
                }
            });
        }
        return response.json(move);
    }
}
exports.default = MovesController;
//# sourceMappingURL=MovesController.js.map