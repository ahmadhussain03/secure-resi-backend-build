"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
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
        Route_1.default.resource('visitor', 'VisitorsController').apiOnly()
            .middleware({
            store: ['can:create-visitor'],
            index: ['can:view-visitor'],
            show: ['can:view-visitor'],
            update: ['can:update-visitor'],
            destroy: ['can:update-visitor'],
        }).as('visitor.visitors');
        Route_1.default.post('fingerprint', 'FingerprintsController.create');
    }).middleware('auth');
}).namespace('App/Controllers/Http/Vms').prefix('api/vms');
//# sourceMappingURL=visitor.js.map