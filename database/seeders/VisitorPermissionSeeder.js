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
        const visitorPermissions = await Permission_1.default.createMany([
            {
                name: 'Create Visitor',
                slug: 'create-visitor',
                type: UserType_1.UserType.client_staff,
                group: 'visitor'
            },
            {
                name: 'Update Visitor',
                slug: 'update-visitor',
                type: UserType_1.UserType.client_staff,
                group: 'visitor'
            },
            {
                name: 'View Visitor',
                slug: 'view-visitor',
                type: UserType_1.UserType.client_staff,
                group: 'visitor'
            },
            {
                name: 'Delete Visitor',
                slug: 'delete-visitor',
                type: UserType_1.UserType.client_staff,
                group: 'visitor'
            },
        ]);
        await role.related('permissions').attach(visitorPermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=VisitorPermissionSeeder.js.map