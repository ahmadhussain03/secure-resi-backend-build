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
                name: 'Create Visitor Type',
                slug: 'create-visitor-type',
                type: UserType_1.UserType.client_staff,
                group: 'visitor_type'
            },
            {
                name: 'Update Visitor Type',
                slug: 'update-visitor-type',
                type: UserType_1.UserType.client_staff,
                group: 'visitor_type'
            },
            {
                name: 'View Visitor Type',
                slug: 'view-visitor-type',
                type: UserType_1.UserType.client_staff,
                group: 'visitor_type'
            },
            {
                name: 'Delete Visitor Type',
                slug: 'delete-visitor-type',
                type: UserType_1.UserType.client_staff,
                group: 'visitor_type'
            },
        ]);
        await role.related('permissions').attach(visitorPermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=VisitorTypePermissionSeeder.js.map