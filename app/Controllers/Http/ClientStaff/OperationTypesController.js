"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OperationTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/OperationTypeRepositoryContract"));
const CreateOperationTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateOperationTypeValidator"));
const UpdateOperationTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateOperationTypeValidator"));
class OperationTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const logTypes = await OperationTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(logTypes);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateOperationTypeValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const operationType = await OperationTypeRepositoryContract_1.default.create(data);
        return response.json(operationType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateOperationTypeValidator_1.default);
        const authUser = auth.user;
        const operationType = await OperationTypeRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(operationType);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const operationType = await OperationTypeRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(operationType);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await OperationTypeRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Operation Type Deleted Successfully" });
    }
}
exports.default = OperationTypesController;
//# sourceMappingURL=OperationTypesController.js.map