"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class default_1 extends Seeder_1.default {
    async run() {
        const role = await Role_1.default.firstOrCreate({
            name: 'project-admin'
        });
        const permissions = await Permission_1.default.createMany([
            {
                name: 'View Permission',
                slug: 'view-permission',
                type: UserType_1.UserType.client_staff,
                group: 'permission'
            }
        ]);
        const allPermissions = permissions.map(permission => permission.id);
        await role.related('permissions').attach(allPermissions);
    }
}
exports.default = default_1;
//# sourceMappingURL=20_ClientStaffPermissionSeeder.js.map