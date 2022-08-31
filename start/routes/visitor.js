"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('gate_terminal', 'GateTerminalsController.index');
    Route_1.default.post('/login/:id', 'LoginController.codeLogin');
    Route_1.default.post('/login', 'LoginController.index');
    Route_1.default.post('face_recognition', 'FaceRecognitionsController.index');
    Route_1.default.post('fingerprint_login', 'FingerprintsController.index');
    Route_1.default.group(() => {
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.post('/logout', 'UsersController.logout');
        Route_1.default.resource('schedule_entry', 'ScheduleEntriesController').only(['index']).middleware({
            index: ['can:view-schedule-entry']
        }).as('visitor.schedule.entry');
        Route_1.default.resource('patrol_entry', 'PatrolEntriesController').only(['index']).middleware({
            index: ['can:view-patrol-entry']
        }).as('visitor.patrol.entry');
        Route_1.default.resource('patrol_schedule_entry', 'PatrolScheduleEntriesController').only(['index', 'show']).middleware({
            index: ['can:view-patrol-schedule-entry'],
            show: ['can:view-patrol-schedule-entry']
        }).as('visitor.patrol.schedule.entry');
        Route_1.default.resource('schedule', 'SchedulesController').apiOnly().middleware({
            index: ['can:view-schedule'],
        }).as('visitor.schedule');
        Route_1.default.resource('emergency_contact', 'EmergencyContactsController').only(['index']).middleware({
            index: ['can:view-emergency-contact'],
        }).as('visitor.emergency.contact');
        Route_1.default.resource('attendance', 'AttendancesController').only(['index']).middleware({
            index: ['can:view-attendance']
        }).as('visitor.attendance');
        Route_1.default.resource('panic_alert', 'PanicAlertsController').only(['store', 'index', 'destroy']).middleware({
            store: ['can:create-panic-alert'],
            index: ['can:view-panic-alert'],
            destroy: ['can:delete-panic-alert'],
        }).as('visitor.panic.alert');
        Route_1.default.resource('checkpoint', 'CheckpointsController').apiOnly().middleware({
            index: ['can:view-checkpoint'],
        }).as('visitor.checkpoint');
        Route_1.default.get('guard_operation', 'GuardOperationsController.index').middleware('can:view-guard-operation');
        Route_1.default.get('guard', 'GuardsController.index').middleware('can:view-patrol-entry');
        Route_1.default.resource('operation_type', 'OperationTypesController').apiOnly().middleware({
            index: ['can:view-operation-type'],
        }).as('visitor.operation.type');
        Route_1.default.resource('unit', 'UnitsController').only(['index']).middleware({
            index: ['can:view-unit']
        }).as('visitor.unit');
        Route_1.default.resource('notification', 'NotificationsController').only(['index', 'store']).middleware({
            index: ['can:view-notification'],
            store: ['can:view-notification']
        }).as('visitor.notification');
        Route_1.default.resource('visitor', 'VisitorsController').apiOnly()
            .middleware({
            store: ['can:create-visitor'],
            index: ['can:create-visitor'],
            show: ['can:view-visitor'],
            update: ['can:update-visitor'],
            destroy: ['can:update-visitor'],
        }).as('visitor.visitors');
        Route_1.default.resource('visitor_plan', 'VisitorPlansController').apiOnly().middleware({
            index: ['can:view-visitor'],
            show: ['can:view-visitor'],
            store: ['can:create-visitor'],
            update: ['can:update-visitor'],
            destroy: ['can:view-visitor']
        }).as('visitor.visitor.plan');
        Route_1.default.resource('resident_panic_alert', 'ResidentPanicAlertsController').only(['update', 'index', 'show'])
            .middleware({
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            update: ['can:view-panic-alert'],
        }).as('visitor.resident_panic_alert');
        Route_1.default.resource('parking_slot', 'ParkingSlotsController').only(['index']).middleware({
            index: ['can:view-parking-slot'],
        }).as('visitor.parking.slot');
        Route_1.default.resource('check_in', 'CheckInsController').only(['index', 'store']).middleware({
            index: ['can:view-visitor'],
            store: ['can:create-visitor'],
        }).as('visitor.check.in');
        Route_1.default.resource('check_out', 'CheckOutsController').only(['index', 'store']).middleware({
            index: ['can:view-visitor'],
            store: ['can:create-visitor'],
        }).as('visitor.check.out');
        Route_1.default.resource('members', 'MembersController').only(['index', 'show']).middleware({
            index: ['can:view-visitor'],
            show: ['can:view-visitor'],
        }).as('visitor.members');
        Route_1.default.post('fingerprint', 'FingerprintsController.create');
    }).middleware('auth');
}).namespace('App/Controllers/Http/Vms').prefix('api/vms');
//# sourceMappingURL=visitor.js.map