"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class SupervisorSeederSeeder extends Seeder_1.default {
    async run() {
        const roleSupervisor = await Role_1.default.create({
            name: 'guard-supervisor'
        });
        const staffPermissions = await Permission_1.default.createMany([
            {
                name: 'Create Staff',
                slug: 'create-staff',
                type: UserType_1.UserType.client_staff,
                group: 'staff'
            },
            {
                name: 'Delete Staff',
                slug: 'delete-staff',
                type: UserType_1.UserType.client_staff,
                group: 'staff'
            },
            {
                name: 'Update Staff',
                slug: 'update-staff',
                type: UserType_1.UserType.client_staff,
                group: 'staff'
            },
            {
                name: 'View Staff',
                slug: 'view-staff',
                type: UserType_1.UserType.client_staff,
                group: 'staff'
            },
            {
                name: 'Create Role',
                slug: 'create-role',
                type: UserType_1.UserType.client_staff,
                group: 'role'
            },
            {
                name: 'Delete Role',
                slug: 'delete-role',
                type: UserType_1.UserType.client_staff,
                group: 'role'
            },
            {
                name: 'Update Role',
                slug: 'update-role',
                type: UserType_1.UserType.client_staff,
                group: 'role'
            },
            {
                name: 'View Role',
                slug: 'view-role',
                type: UserType_1.UserType.client_staff,
                group: 'role'
            },
            {
                name: 'View Log Type',
                slug: 'view-log-type',
                type: UserType_1.UserType.client_staff,
                group: 'log_type'
            },
            {
                name: 'Create Log Type',
                slug: 'create-log-type',
                type: UserType_1.UserType.client_staff,
                group: 'log_type'
            },
            {
                name: 'Update Log Type',
                slug: 'update-log-type',
                type: UserType_1.UserType.client_staff,
                group: 'log_type'
            },
            {
                name: 'Delete Log Type',
                slug: 'delete-log-type',
                type: UserType_1.UserType.client_staff,
                group: 'log_type'
            },
            {
                name: 'View Log Pre Defined Message',
                slug: 'view-log-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'log_type_predefined_message'
            },
            {
                name: 'Create Log Pre Defined Message',
                slug: 'create-log-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'log_type_predefined_message'
            },
            {
                name: 'Update Log Pre Defined Message',
                slug: 'update-log-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'log_type_predefined_message'
            },
            {
                name: 'Delete Log Pre Defined Message',
                slug: 'delete-log-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'log_type_predefined_message'
            },
            {
                name: 'View Patrol Pre Defined Message',
                slug: 'view-patrol-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_predefined_message'
            },
            {
                name: 'Create Patrol Pre Defined Message',
                slug: 'create-patrol-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_predefined_message'
            },
            {
                name: 'Update Patrol Pre Defined Message',
                slug: 'update-patrol-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_predefined_message'
            },
            {
                name: 'Delete Patrol Pre Defined Message',
                slug: 'delete-patrol-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_predefined_message'
            }
        ]);
        await roleSupervisor.related('permissions').attach(staffPermissions.map(permission => permission.id));
    }
}
exports.default = SupervisorSeederSeeder;
//# sourceMappingURL=3_SupervisorSeeder.js.map