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
        let role = await Role_1.default.query().where('name', 'Project Manager').first();
        if (role) {
            role.name = 'client-admin';
            await role.save();
        }
        else {
            role = await Role_1.default.firstOrCreate({
                name: 'client-admin'
            });
        }
        const permissions = await Permission_1.default.createMany([
            {
                name: 'View Permission',
                slug: 'view-permission',
                type: UserType_1.UserType.client,
                group: 'permission'
            }
        ]);
        const allPermissions = permissions.map(permission => permission.id);
        await role.related('permissions').attach(allPermissions);
    }
}
exports.default = default_1;
//# sourceMappingURL=19_ClientPermissionSeeder.js.map