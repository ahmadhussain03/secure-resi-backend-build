"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckOutRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/CheckOutRepositoryContract"));
const CreateCheckOutValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Vms/CreateCheckOutValidator"));
class CheckOutsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const checkIns = await CheckOutRepositoryContract_1.default.all(request, project);
        return response.json(checkIns);
    }
    async store({ request, response, auth }) {
        const user = auth.user;
        const project = user.clientStaff.project;
        const data = await request.validate(CreateCheckOutValidator_1.default);
        data.projectId = project.id;
        data.userId = user.id;
        const checkOut = await CheckOutRepositoryContract_1.default.create(data);
        return response.json(checkOut);
    }
}
exports.default = CheckOutsController;
//# sourceMappingURL=CheckOutsController.js.map