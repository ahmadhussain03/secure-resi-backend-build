"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
class RoleRepository {
    async getById(id) {
        const role = await Role_1.default.query().where('id', id).firstOrFail();
        return role;
    }
}
exports.default = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map