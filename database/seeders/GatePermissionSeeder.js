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
                name: 'Create Gate Pass Type',
                slug: 'create-gate-pass-type',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass_type'
            },
            {
                name: 'Update Gate Pass Type',
                slug: 'update-gate-pass-type',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass_type'
            },
            {
                name: 'View Gate Pass Type',
                slug: 'view-gate-pass-type',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass_type'
            },
            {
                name: 'Delete Gate Pass Type',
                slug: 'delete-gate-pass-type',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass_type'
            },
            {
                name: 'Create Gate Pass',
                slug: 'create-gate-pass',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass'
            },
            {
                name: 'Update Gate Pass',
                slug: 'update-gate-pass',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass'
            },
            {
                name: 'View Gate Pass',
                slug: 'view-gate-pass',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass'
            },
            {
                name: 'Delete Gate Pass',
                slug: 'delete-gate-pass',
                type: UserType_1.UserType.client_staff,
                group: 'gate_pass'
            }
        ]);
        await role.related('permissions').attach(gatePermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=GatePermissionSeeder.js.map