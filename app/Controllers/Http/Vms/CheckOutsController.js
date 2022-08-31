"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCheckOutValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Vms/CreateCheckOutValidator"));
class CheckOutsController {
    async store({ request, response }) {
        const data = await request.validate(CreateCheckOutValidator_1.default);
        return response.json(data);
    }
}
exports.default = CheckOutsController;
//# sourceMappingURL=CheckOutsController.js.map