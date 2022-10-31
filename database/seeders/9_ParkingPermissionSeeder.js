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
                name: 'Create Parking Type',
                slug: 'create-parking-type',
                type: UserType_1.UserType.client_staff,
                group: 'parking_type'
            },
            {
                name: 'Update Parking Type',
                slug: 'update-parking-type',
                type: UserType_1.UserType.client_staff,
                group: 'parking_type'
            },
            {
                name: 'View Parking Type',
                slug: 'view-parking-type',
                type: UserType_1.UserType.client_staff,
                group: 'parking_type'
            },
            {
                name: 'Delete Parking Type',
                slug: 'delete-parking-type',
                type: UserType_1.UserType.client_staff,
                group: 'parking_type'
            },
            {
                name: 'Create Parking Level',
                slug: 'create-parking-level',
                type: UserType_1.UserType.client_staff,
                group: 'parking_level'
            },
            {
                name: 'Update Parking Level',
                slug: 'update-parking-level',
                type: UserType_1.UserType.client_staff,
                group: 'parking_level'
            },
            {
                name: 'View Parking Level',
                slug: 'view-parking-level',
                type: UserType_1.UserType.client_staff,
                group: 'parking_level'
            },
            {
                name: 'Delete Parking Level',
                slug: 'delete-parking-level',
                type: UserType_1.UserType.client_staff,
                group: 'parking_level'
            },
            {
                name: 'Create Parking Slot',
                slug: 'create-parking-slot',
                type: UserType_1.UserType.client_staff,
                group: 'parking_slot'
            },
            {
                name: 'Update Parking Slot',
                slug: 'update-parking-slot',
                type: UserType_1.UserType.client_staff,
                group: 'parking_slot'
            },
            {
                name: 'View Parking Slot',
                slug: 'view-parking-slot',
                type: UserType_1.UserType.client_staff,
                group: 'parking_slot'
            },
            {
                name: 'Delete Parking Slot',
                slug: 'delete-parking-slot',
                type: UserType_1.UserType.client_staff,
                group: 'parking_slot'
            },
        ]);
        await role.related('permissions').attach(parkingPermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=9_ParkingPermissionSeeder.js.map