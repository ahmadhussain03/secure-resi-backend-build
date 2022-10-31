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
        const role = await Role_1.default.query().where('name', 'guard').firstOrFail();
        const gatePermissions = await Permission_1.default.createMany([
            {
                name: 'Create Gate Terminal',
                slug: 'create-gate-terminal',
                type: UserType_1.UserType.client_staff,
                group: 'gate_terminal'
            },
            {
                name: 'Update Gate Terminal',
                slug: 'update-gate-terminal',
                type: UserType_1.UserType.client_staff,
                group: 'gate_terminal'
            },
            {
                name: 'View Gate Terminal',
                slug: 'view-gate-terminal',
                type: UserType_1.UserType.client_staff,
                group: 'gate_terminal'
            },
            {
                name: 'Delete Gate Terminal',
                slug: 'delete-gate-terminal',
                type: UserType_1.UserType.client_staff,
                group: 'gate_terminal'
            },
            {
                name: 'Create Race',
                slug: 'create-race',
                type: UserType_1.UserType.client_staff,
                group: 'race'
            },
            {
                name: 'Update Race',
                slug: 'update-race',
                type: UserType_1.UserType.client_staff,
                group: 'race'
            },
            {
                name: 'View Race',
                slug: 'view-race',
                type: UserType_1.UserType.client_staff,
                group: 'race'
            },
            {
                name: 'Delete Race',
                slug: 'delete-race',
                type: UserType_1.UserType.client_staff,
                group: 'race'
            },
            {
                name: 'Create Religion',
                slug: 'create-religion',
                type: UserType_1.UserType.client_staff,
                group: 'religion'
            },
            {
                name: 'Update Religion',
                slug: 'update-religion',
                type: UserType_1.UserType.client_staff,
                group: 'religion'
            },
            {
                name: 'View Religion',
                slug: 'view-religion',
                type: UserType_1.UserType.client_staff,
                group: 'religion'
            },
            {
                name: 'Delete Religion',
                slug: 'delete-religion',
                type: UserType_1.UserType.client_staff,
                group: 'religion'
            }
        ]);
        await role.related('permissions').attach(gatePermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=10_SettingPermissionSeeder.js.map