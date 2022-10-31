"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
const LogTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LogTypeRepositoryContract"));
const OperationTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/OperationTypeRepositoryContract"));
const LogPreDefinedRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LogPreDefinedRepositoryContract"));
const OperationPreDefinedRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/OperationPreDefinedRepositoryContract"));
class RolePermissionSeeder extends Seeder_1.default {
    async run() {
        await Role_1.default.query().delete();
        await Permission_1.default.query().delete();
        await Project_1.default.query().delete();
        const role = await Role_1.default.create({
            name: 'Default Client'
        });
        const roleManager = await Role_1.default.create({
            name: 'Project Manager'
        });
        const roleClientStaff = await Role_1.default.create({
            name: 'guard',
        });
        const roleOwner = await Role_1.default.create({
            name: 'owner',
        });
        const roleResident = await Role_1.default.create({
            name: 'resident',
        });
        const permissions = await Permission_1.default.createMany([
            {
                name: 'Create Project',
                slug: 'create-project',
                type: UserType_1.UserType.client,
                group: 'project'
            },
            {
                name: 'Delete Project',
                slug: 'delete-project',
                type: UserType_1.UserType.client,
                group: 'project'
            },
            {
                name: 'Update Project',
                slug: 'update-project',
                type: UserType_1.UserType.client,
                group: 'project'
            },
            {
                name: 'View Project',
                slug: 'view-project',
                type: UserType_1.UserType.client,
                group: 'project'
            },
            {
                name: 'Create Role',
                slug: 'create-role',
                type: UserType_1.UserType.client,
                group: 'role'
            },
            {
                name: 'Delete Role',
                slug: 'delete-role',
                type: UserType_1.UserType.client,
                group: 'role'
            },
            {
                name: 'Update Role',
                slug: 'update-role',
                type: UserType_1.UserType.client,
                group: 'role'
            },
            {
                name: 'View Role',
                slug: 'view-role',
                type: UserType_1.UserType.client,
                group: 'role'
            },
            {
                name: 'Create Staff',
                slug: 'create-staff',
                type: UserType_1.UserType.client,
                group: 'staff'
            },
            {
                name: 'Delete Staff',
                slug: 'delete-staff',
                type: UserType_1.UserType.client,
                group: 'staff'
            },
            {
                name: 'Update Staff',
                slug: 'update-staff',
                type: UserType_1.UserType.client,
                group: 'staff'
            },
            {
                name: 'View Staff',
                slug: 'view-staff',
                type: UserType_1.UserType.client,
                group: 'staff'
            },
            {
                name: 'Create Staff',
                slug: 'create-staff',
                type: UserType_1.UserType.client,
                group: 'staff'
            },
            {
                name: 'Assign Project to Staff',
                slug: 'assign-project-staff',
                type: UserType_1.UserType.client,
                group: 'staff'
            },
            {
                name: 'Unassign Project to Staff',
                slug: 'unassign-project-staff',
                type: UserType_1.UserType.client,
                group: 'staff'
            },
        ]);
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
        const operationPermissions = await Permission_1.default.createMany([
            {
                name: 'View Operation Type',
                slug: 'view-operation-type',
                type: UserType_1.UserType.client_staff,
                group: 'operation_type'
            },
            {
                name: 'Create Operation Type',
                slug: 'create-operation-type',
                type: UserType_1.UserType.client_staff,
                group: 'operation_type'
            },
            {
                name: 'Update Operation Type',
                slug: 'update-operation-type',
                type: UserType_1.UserType.client_staff,
                group: 'operation_type'
            },
            {
                name: 'Delete Operation Type',
                slug: 'delete-operation-type',
                type: UserType_1.UserType.client_staff,
                group: 'operation_type'
            },
            {
                name: 'View Operation Pre Defined Message',
                slug: 'view-operation-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'operation_predefined_message'
            },
            {
                name: 'Create Operation Pre Defined Message',
                slug: 'create-operation-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'operation_predefined_message'
            },
            {
                name: 'Update Operation Pre Defined Message',
                slug: 'update-operation-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'operation_predefined_message'
            },
            {
                name: 'Delete Operation Pre Defined Message',
                slug: 'delete-operation-pre-defined-message',
                type: UserType_1.UserType.client_staff,
                group: 'operation_predefined_message'
            }
        ]);
        const notificationPermissions = await Permission_1.default.createMany([
            {
                name: 'View Premises Notification',
                slug: 'view-premises-notification',
                type: UserType_1.UserType.client_staff,
                group: 'premises_notifications'
            },
            {
                name: 'Create Premises Notification',
                slug: 'create-premises-notification',
                type: UserType_1.UserType.client_staff,
                group: 'premises_notifications'
            },
            {
                name: 'Delete Premises Notification',
                slug: 'delete-premises-notification',
                type: UserType_1.UserType.client_staff,
                group: 'premises_notifications'
            },
            {
                name: 'Update Premises Notification',
                slug: 'update-premises-notification',
                type: UserType_1.UserType.client_staff,
                group: 'premises_notifications'
            },
            {
                name: 'View Notification',
                slug: 'view-notification',
                type: UserType_1.UserType.client_staff,
                group: 'notification'
            },
        ]);
        const logAndOperationsPermissions = await Permission_1.default.createMany([
            {
                name: 'View Log Book',
                slug: 'view-log-book',
                type: UserType_1.UserType.client_staff,
                group: 'log_book'
            },
            {
                name: 'Create Log Book',
                slug: 'create-log-book',
                type: UserType_1.UserType.client_staff,
                group: 'log_book'
            },
            {
                name: 'Update Log Book',
                slug: 'update-log-book',
                type: UserType_1.UserType.client_staff,
                group: 'log_book'
            },
            {
                name: 'Delete Log Book',
                slug: 'delete-log-book',
                type: UserType_1.UserType.client_staff,
                group: 'log_book'
            },
            {
                name: 'View Guard Operation',
                slug: 'view-guard-operation',
                type: UserType_1.UserType.client_staff,
                group: 'guard_operation'
            },
            {
                name: 'Create Guard Operation',
                slug: 'create-guard-operation',
                type: UserType_1.UserType.client_staff,
                group: 'guard_operation'
            },
            {
                name: 'Update Guard Operation',
                slug: 'update-guard-operation',
                type: UserType_1.UserType.client_staff,
                group: 'guard_operation'
            },
            {
                name: 'Delete Guard Operation',
                slug: 'delete-guard-operation',
                type: UserType_1.UserType.client_staff,
                group: 'guard_operation'
            },
            {
                name: 'Create Panic Alert',
                slug: 'create-panic-alert',
                type: UserType_1.UserType.client_staff,
                group: 'panic_alert'
            },
            {
                name: 'View Panic Alert',
                slug: 'view-panic-alert',
                type: UserType_1.UserType.client_staff,
                group: 'panic_alert'
            },
            {
                name: 'Delete Panic Alert',
                slug: 'delete-panic-alert',
                type: UserType_1.UserType.client_staff,
                group: 'panic_alert'
            },
            {
                name: 'Create Checkpoint',
                slug: 'create-checkpoint',
                type: UserType_1.UserType.client_staff,
                group: 'checkpoint'
            },
            {
                name: 'Update Checkpoint',
                slug: 'update-checkpoint',
                type: UserType_1.UserType.client_staff,
                group: 'checkpoint'
            },
            {
                name: 'View Checkpoint',
                slug: 'view-checkpoint',
                type: UserType_1.UserType.client_staff,
                group: 'checkpoint'
            },
            {
                name: 'Delete Checkpoint',
                slug: 'delete-checkpoint',
                type: UserType_1.UserType.client_staff,
                group: 'checkpoint'
            },
        ]);
        const schedulePermissions = await Permission_1.default.createMany([
            {
                name: 'Create Schedule',
                slug: 'create-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'schedule'
            },
            {
                name: 'View Schedule',
                slug: 'view-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'schedule'
            },
            {
                name: 'Update Schedule',
                slug: 'update-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'schedule'
            },
            {
                name: 'Delete Schedule',
                slug: 'delete-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'schedule'
            },
            {
                name: 'Create Patrol Schedule',
                slug: 'create-patrol-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_schedule'
            },
            {
                name: 'View Patrol Schedule',
                slug: 'view-patrol-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_schedule'
            },
            {
                name: 'Update Patrol Schedule',
                slug: 'update-patrol-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_schedule'
            },
            {
                name: 'Delete Patrol Schedule',
                slug: 'delete-patrol-schedule',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_schedule'
            },
            {
                name: 'Create Patrol Entry',
                slug: 'create-patrol-entry',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_entry'
            },
            {
                name: 'View Patrol Entry',
                slug: 'view-patrol-entry',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_entry'
            },
            {
                name: 'Create Patrol Schedule Entry',
                slug: 'create-patrol-schedule-entry',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_schedule_entry'
            },
            {
                name: 'View Patrol Schedule Entry',
                slug: 'view-patrol-schedule-entry',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_schedule_entry'
            },
            {
                name: 'Create Schedule Entry',
                slug: 'create-schedule-entry',
                type: UserType_1.UserType.client_staff,
                group: 'schedule_entry'
            },
            {
                name: 'View Schedule Entry',
                slug: 'view-schedule-entry',
                type: UserType_1.UserType.client_staff,
                group: 'schedule_entry'
            },
            {
                name: 'View Attendance',
                slug: 'view-attendance',
                type: UserType_1.UserType.client_staff,
                group: 'attendance'
            },
            {
                name: 'Create Attendance',
                slug: 'create-attendance',
                type: UserType_1.UserType.client_staff,
                group: 'attendance'
            },
            {
                name: 'View Guard Items',
                slug: 'view-guard-item',
                type: UserType_1.UserType.client_staff,
                group: 'guard_items'
            },
            {
                name: 'Create Guard Items',
                slug: 'create-guard-item',
                type: UserType_1.UserType.client_staff,
                group: 'guard_items'
            },
            {
                name: 'Update Guard Items',
                slug: 'update-guard-item',
                type: UserType_1.UserType.client_staff,
                group: 'guard_items'
            },
            {
                name: 'Delete Guard Items',
                slug: 'delete-guard-item',
                type: UserType_1.UserType.client_staff,
                group: 'guard_items'
            },
            {
                name: 'Assign Guard Items',
                slug: 'assign-guard-item',
                type: UserType_1.UserType.client_staff,
                group: 'guard_items'
            },
            {
                name: 'View Shift',
                slug: 'view-shift',
                type: UserType_1.UserType.client_staff,
                group: 'shift'
            },
            {
                name: 'View Emergency Contact',
                slug: 'view-emergency-contact',
                type: UserType_1.UserType.client_staff,
                group: 'emergency_contacts'
            },
            {
                name: 'Create Emergency Contact',
                slug: 'create-emergency-contact',
                type: UserType_1.UserType.client_staff,
                group: 'emergency_contacts'
            },
            {
                name: 'update Emergency Contact',
                slug: 'update-emergency-contact',
                type: UserType_1.UserType.client_staff,
                group: 'emergency_contacts'
            },
            {
                name: 'Delete Emergency Contact',
                slug: 'delete-emergency-contact',
                type: UserType_1.UserType.client_staff,
                group: 'emergency_contacts'
            },
            {
                name: 'Update Profile',
                slug: 'update-profile',
                type: UserType_1.UserType.client_staff,
                group: 'profile'
            },
            {
                name: 'Create Block',
                slug: 'create-block',
                type: UserType_1.UserType.client_staff,
                group: 'block'
            },
            {
                name: 'Update Block',
                slug: 'update-block',
                type: UserType_1.UserType.client_staff,
                group: 'block'
            },
            {
                name: 'View Block',
                slug: 'view-block',
                type: UserType_1.UserType.client_staff,
                group: 'block'
            },
            {
                name: 'Delete Block',
                slug: 'delete-block',
                type: UserType_1.UserType.client_staff,
                group: 'block'
            },
            {
                name: 'Create Level',
                slug: 'create-level',
                type: UserType_1.UserType.client_staff,
                group: 'level'
            },
            {
                name: 'Update Level',
                slug: 'update-level',
                type: UserType_1.UserType.client_staff,
                group: 'level'
            },
            {
                name: 'View Level',
                slug: 'view-level',
                type: UserType_1.UserType.client_staff,
                group: 'level'
            },
            {
                name: 'Delete Level',
                slug: 'delete-level',
                type: UserType_1.UserType.client_staff,
                group: 'level'
            },
            {
                name: 'Create Owner',
                slug: 'create-owner',
                type: UserType_1.UserType.client_staff,
                group: 'owner'
            },
            {
                name: 'Update Owner',
                slug: 'update-owner',
                type: UserType_1.UserType.client_staff,
                group: 'owner'
            },
            {
                name: 'View Owner',
                slug: 'view-owner',
                type: UserType_1.UserType.client_staff,
                group: 'owner'
            },
            {
                name: 'Delete Owner',
                slug: 'delete-owner',
                type: UserType_1.UserType.client_staff,
                group: 'owner'
            },
            {
                name: 'Create Unit',
                slug: 'create-unit',
                type: UserType_1.UserType.client_staff,
                group: 'unit'
            },
            {
                name: 'Update Unit',
                slug: 'update-unit',
                type: UserType_1.UserType.client_staff,
                group: 'unit'
            },
            {
                name: 'View Unit',
                slug: 'view-unit',
                type: UserType_1.UserType.client_staff,
                group: 'unit'
            },
            {
                name: 'Delete Unit',
                slug: 'delete-unit',
                type: UserType_1.UserType.client_staff,
                group: 'unit'
            },
            {
                name: 'Create Resident',
                slug: 'create-resident',
                type: UserType_1.UserType.client_staff,
                group: 'resident'
            },
            {
                name: 'Update Resident',
                slug: 'update-resident',
                type: UserType_1.UserType.client_staff,
                group: 'resident'
            },
            {
                name: 'View Resident',
                slug: 'view-resident',
                type: UserType_1.UserType.client_staff,
                group: 'resident'
            },
            {
                name: 'Delete Resident',
                slug: 'delete-resident',
                type: UserType_1.UserType.client_staff,
                group: 'resident'
            },
            {
                name: 'Create Mo Account',
                slug: 'create-mo-account',
                type: UserType_1.UserType.client_staff,
                group: 'mo-account'
            },
            {
                name: 'View Mo Account',
                slug: 'view-mo-account',
                type: UserType_1.UserType.client_staff,
                group: 'mo-account'
            },
            {
                name: 'Update Mo Account',
                slug: 'update-mo-account',
                type: UserType_1.UserType.client_staff,
                group: 'mo-account'
            },
            {
                name: 'Delete Mo Account',
                slug: 'delete-mo-account',
                type: UserType_1.UserType.client_staff,
                group: 'mo-account'
            },
            {
                name: 'Create Facility Type',
                slug: 'create-facility-type',
                type: UserType_1.UserType.client_staff,
                group: 'facility-type'
            },
            {
                name: 'View Facility Type',
                slug: 'view-facility-type',
                type: UserType_1.UserType.client_staff,
                group: 'facility-type'
            },
            {
                name: 'Update Facility Type',
                slug: 'update-facility-type',
                type: UserType_1.UserType.client_staff,
                group: 'facility-type'
            },
            {
                name: 'Delete Facility Type',
                slug: 'delete-facility-type',
                type: UserType_1.UserType.client_staff,
                group: 'facility-type'
            },
            {
                name: 'Create Guide Book',
                slug: 'create-guide-book',
                type: UserType_1.UserType.client_staff,
                group: 'guide-book'
            },
            {
                name: 'View Guide Book',
                slug: 'view-guide-book',
                type: UserType_1.UserType.client_staff,
                group: 'guide-book'
            },
            {
                name: 'Update Guide Book',
                slug: 'update-guide-book',
                type: UserType_1.UserType.client_staff,
                group: 'guide-book'
            },
            {
                name: 'Delete Guide Book',
                slug: 'delete-guide-book',
                type: UserType_1.UserType.client_staff,
                group: 'guide-book'
            },
        ]);
        const ownerPermissions = await Permission_1.default.createMany([
            {
                name: 'Create Panic Alert',
                slug: 'create-panic-alert',
                type: UserType_1.UserType.resident,
                group: 'panic_alert'
            },
            {
                name: 'View Panic Alert',
                slug: 'view-panic-alert',
                type: UserType_1.UserType.resident,
                group: 'panic_alert'
            },
            {
                name: 'Update Panic Alert',
                slug: 'update-panic-alert',
                type: UserType_1.UserType.resident,
                group: 'panic_alert'
            },
        ]);
        const allPermissions = permissions.map(permission => permission.id);
        await role.related('permissions').sync(allPermissions);
        await roleManager.related('permissions').sync(allPermissions);
        await User_1.default.query().where('id', 2).update({
            role_id: roleManager.id
        });
        await User_1.default.query().where('id', 3).update({
            role_id: role.id
        });
        await roleOwner.related('permissions').attach(ownerPermissions.map(permission => permission.id));
        await roleResident.related('permissions').attach(ownerPermissions.map(permission => permission.id));
        await roleClientStaff.related('permissions').attach(staffPermissions.map(permission => permission.id));
        await roleClientStaff.related('permissions').attach(operationPermissions.map(permission => permission.id));
        await roleClientStaff.related('permissions').attach(notificationPermissions.map(permission => permission.id));
        await roleClientStaff.related('permissions').attach(logAndOperationsPermissions.map(permission => permission.id));
        await roleClientStaff.related('permissions').attach(schedulePermissions.map(permission => permission.id));
        const project = await Project_1.default.create({
            name: "My Project",
            code: "700e",
            noOfCheckpoints: 10,
            noOfGuards: 100,
            noOfProjectStaff: 59,
            noOfMembers: 200,
            country: "PK",
            city: "Gujranwala",
            state: "Punjab",
            address: "Address",
            postCode: "55250",
            contactPersonName: "Admin",
            contactPersonEmail: "admin@secure.com",
            contactPersonDesignation: "Admin",
            contactPersonPhone: "03009900990",
            contactPersonFax: "112233",
            latitude: "98.99",
            longitude: "34.81",
            geofenceRadius: "177",
            geocode: "1",
            userId: 3
        });
        const project2 = await Project_1.default.create({
            name: "My Project 2",
            code: "720e",
            noOfCheckpoints: 10,
            noOfGuards: 100,
            noOfProjectStaff: 59,
            noOfMembers: 200,
            country: "PK",
            city: "Gujranwala",
            state: "Punjab",
            address: "Address",
            postCode: "55250",
            contactPersonName: "Admin",
            contactPersonEmail: "admin@secure.com",
            contactPersonDesignation: "Admin",
            contactPersonPhone: "03009900990",
            contactPersonFax: "112233",
            latitude: "98.99",
            longitude: "34.81",
            geofenceRadius: "177",
            geocode: "1",
            userId: 3
        });
        const staff = await User_1.default.create({
            username: "client-staff@secure.com",
            password: "@Admin123",
            userType: UserType_1.UserType.client_staff,
            roleId: roleClientStaff.id,
            parentId: 3
        });
        const staff2 = await User_1.default.create({
            username: "client-staff2@secure.com",
            password: "admin123",
            userType: UserType_1.UserType.client_staff,
            roleId: roleClientStaff.id,
            parentId: 3
        });
        await staff.related('profile').create({
            email: "client-staff@secure.com",
            name: "Staff Seeded",
            mobileNo: "0900999"
        });
        await staff2.related('profile').create({
            email: "client-staff2@secure.com",
            name: "Staff Seeded",
            mobileNo: "0900999"
        });
        await staff.related('clientStaff').create({
            staffCode: "1188",
            nfcCode: "12345",
            userId: staff.id,
            projectId: project.id,
        });
        await staff2.related('clientStaff').create({
            staffCode: "11882",
            nfcCode: "123452",
            userId: staff2.id,
            projectId: project2.id,
        });
        await LogTypeRepositoryContract_1.default.create({
            name: 'log type',
            projectId: project.id,
            status: 'Status One',
            statusOne: 'Status Two',
            statusTwo: 'Status Three'
        });
        await OperationTypeRepositoryContract_1.default.create({
            name: 'operation type',
            projectId: project.id,
            status: 'Status One',
            statusOne: 'Status Two',
            statusTwo: 'Status Three'
        });
        await LogPreDefinedRepositoryContract_1.default.create({
            message: 'Log Message',
            projectId: project.id
        });
        await OperationPreDefinedRepositoryContract_1.default.create({
            message: 'Operation Message',
            projectId: project.id,
        });
    }
}
exports.default = RolePermissionSeeder;
//# sourceMappingURL=2_RolePermission.js.map