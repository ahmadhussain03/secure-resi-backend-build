"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShiftRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ShiftRepositoryContract"));
const CreateShiftValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateShiftValidator"));
class ShiftsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const shifts = await ShiftRepositoryContract_1.default.all(request, projectId);
        return response.json(shifts);
    }
    async report({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const shifts = await ShiftRepositoryContract_1.default.allPaginated(request, projectId);
        return response.json(shifts);
    }
    async show({ response, auth, params }) {
        const authUser = await auth.user;
        const projectId = authUser.clientStaff.projectId;
        const shift = await ShiftRepositoryContract_1.default.findById(params.id, projectId);
        return response.json(shift);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        await authUser.load('clientStaff');
        const data = await request.validate(CreateShiftValidator_1.default);
        if (data.to === authUser.id) {
            return response.unprocessableEntity({
                message: 'Can not self assign the items'
            });
        }
        data.from = authUser.id;
        data.projectId = authUser.clientStaff.projectId;
        const shift = await ShiftRepositoryContract_1.default.create(data);
        return response.json(shift);
    }
}
exports.default = ShiftsController;
//# sourceMappingURL=ShiftsController.js.map