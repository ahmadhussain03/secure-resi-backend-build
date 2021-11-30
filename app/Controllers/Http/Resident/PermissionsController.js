"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class PermissionsController {
    async index({ response }) {
        const permissions = await Permission_1.default.query().select(['id', 'name', 'slug']).where('type', UserType_1.UserType.resident);
        response.json(permissions);
    }
}
exports.default = PermissionsController;
//# sourceMappingURL=PermissionsController.js.map