"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('/project_verification', 'ProjectVerificationsController.index');
    Route_1.default.get('gate_terminal', 'GateTerminalsController.index');
    Route_1.default.post('/login/:id', 'LoginController.codeLogin');
    Route_1.default.post('/login', 'LoginController.index');
    Route_1.default.post('face_recognition', 'FaceRecognitionsController.index');
    Route_1.default.post('fingerprint_login', 'FingerprintsController.index');
    Route_1.default.group(() => {
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.post('/logout', 'UsersController.logout');
        Route_1.default.resource('schedule_entry', 'ScheduleEntriesController').only(['index']).as('visitor.schedule.entry');
        Route_1.default.resource('patrol_entry', 'PatrolEntriesController').only(['index']).as('visitor.patrol.entry');
        Route_1.default.resource('patrol_schedule_entry', 'PatrolScheduleEntriesController').only(['index', 'show']).as('visitor.patrol.schedule.entry');
        Route_1.default.resource('schedule', 'SchedulesController').apiOnly().as('visitor.schedule');
        Route_1.default.resource('emergency_contact', 'EmergencyContactsController').only(['index']).as('visitor.emergency.contact');
        Route_1.default.resource('attendance', 'AttendancesController').only(['index']).as('visitor.attendance');
        Route_1.default.resource('panic_alert', 'PanicAlertsController').only(['store', 'index', 'destroy']).as('visitor.panic.alert');
        Route_1.default.resource('checkpoint', 'CheckpointsController').apiOnly().as('visitor.checkpoint');
        Route_1.default.get('guard_operation', 'GuardOperationsController.index');
        Route_1.default.get('guard', 'GuardsController.index');
        Route_1.default.resource('operation_type', 'OperationTypesController').apiOnly().as('visitor.operation.type');
        Route_1.default.resource('unit', 'UnitsController').only(['index']).as('visitor.unit');
        Route_1.default.resource('notification', 'NotificationsController').only(['index', 'store']).as('visitor.notification');
        Route_1.default.resource('visitor', 'VisitorsController').apiOnly().as('visitor.visitors');
        Route_1.default.resource('visitor_plan', 'VisitorPlansController').apiOnly().as('visitor.visitor.plan');
        Route_1.default.resource('resident_panic_alert', 'ResidentPanicAlertsController').only(['update', 'index', 'show']).as('visitor.resident_panic_alert');
        Route_1.default.resource('parking_slot', 'ParkingSlotsController').only(['index']).as('visitor.parking.slot');
        Route_1.default.resource('check_in', 'CheckInsController').only(['index', 'store']).as('visitor.check.in');
        Route_1.default.resource('check_out', 'CheckOutsController').only(['index', 'store']).as('visitor.check.out');
        Route_1.default.resource('members', 'MembersController').only(['index', 'show']).as('visitor.members');
        Route_1.default.resource('visitor_type', 'VisitorTypesController').only(['index']).as('visitor.visitor_type');
        Route_1.default.get('visitor_overstay', 'VisitorOverstaysController.index');
        Route_1.default.post('fingerprint', 'FingerprintsController.create');
    }).middleware('auth');
}).namespace('App/Controllers/Http/Vms').prefix('api/vms');
//# sourceMappingURL=visitor.js.map