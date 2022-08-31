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
        const parkingPermissions = await Permission_1.default.createMany([
            {
                name: 'Create Improvement Type',
                slug: 'create-improvement-type',
                type: UserType_1.UserType.client_staff,
                group: 'improvement_type'
            },
            {
                name: 'Update Improvement Type',
                slug: 'update-improvement-type',
                type: UserType_1.UserType.client_staff,
                group: 'improvement_type'
            },
            {
                name: 'View Improvement Type',
                slug: 'view-improvement-type',
                type: UserType_1.UserType.client_staff,
                group: 'improvement_type'
            },
            {
                name: 'Delete Improvement Type',
                slug: 'delete-improvement-type',
                type: UserType_1.UserType.client_staff,
                group: 'improvement_type'
            },
        ]);
        await role.related('permissions').attach(parkingPermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=ImprovementTypePermissionSeeder.js.map