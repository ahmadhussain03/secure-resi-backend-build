"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('/login', 'LoginController.index');
    Route_1.default.post('/project_verification', 'ProjectVerificationsController.index');
    Route_1.default.post('/client_staff/:id/search', 'ClientStaffsController.search').as('client.staff.search');
    Route_1.default.post('face_recognition', 'FaceRecognitionsController').as('guard.face.recognition');
    Route_1.default.group(() => {
        Route_1.default.get('/dashboard', 'DashboardController.index').middleware('can:view-staff');
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.get('/client_staff', 'ClientStaffsController.index').middleware('can:view-staff');
        Route_1.default.post('/client_staff', 'ClientStaffsController.create').middleware('can:create-staff');
        Route_1.default.get('/client_staff/:id', 'ClientStaffsController.show').middleware('can:view-staff');
        Route_1.default.put('/client_staff/:id', 'ClientStaffsController.update').middleware('can:update-staff');
        Route_1.default.delete('/client_staff/:id', 'ClientStaffsController.destroy').middleware('can:delete-staff');
        Route_1.default.get('/permissions', 'PermissionsController.index').middleware('can:view-role');
        Route_1.default.get('/role', 'RolesController.index').middleware('can:view-role');
        Route_1.default.post('/role', 'RolesController.store').middleware('can:create-role');
        Route_1.default.get('/role/:id', 'RolesController.show').middleware('can:view-role');
        Route_1.default.put('/role/:id', 'RolesController.update').middleware('can:update-role');
        Route_1.default.delete('/role/:id', 'RolesController.destroy').middleware('can:delete-role');
        Route_1.default.resource('log_type', 'LogTypesController').apiOnly().middleware({
            store: ['can:create-log-type'],
            index: ['can:view-log-type'],
            show: ['can:view-log-type'],
            update: ['can:update-log-type'],
            destroy: ['can:delete-log-type'],
        }).as('guard.log_type');
        Route_1.default.resource('log_predefined_message', 'LogPreDefinedMessagesController').apiOnly().middleware({
            store: ['can:create-log-pre-defined-message'],
            index: ['can:view-log-pre-defined-message'],
            show: ['can:view-log-pre-defined-message'],
            update: ['can:update-log-pre-defined-message'],
            destroy: ['can:delete-log-pre-defined-message'],
        }).as('guard.log_predefined_message');
        Route_1.default.resource('operation_type', 'OperationTypesController').apiOnly().middleware({
            store: ['can:create-operation-type'],
            index: ['can:view-operation-type'],
            show: ['can:view-operation-type'],
            update: ['can:update-operation-type'],
            destroy: ['can:delete-operation-type'],
        }).as('guard.operation_type');
        Route_1.default.resource('operation_predefined_message', 'OperationPreDefinedMessagesController').apiOnly().middleware({
            store: ['can:create-operation-pre-defined-message'],
            index: ['can:view-operation-pre-defined-message'],
            show: ['can:view-operation-pre-defined-message'],
            update: ['can:update-operation-pre-defined-message'],
            destroy: ['can:delete-operation-pre-defined-message'],
        }).as('guard.operation_predefined_message');
        Route_1.default.resource('premises_notification', 'StaffNotificationsController').apiOnly().middleware({
            store: ['can:create-premises-notification'],
            index: ['can:view-premises-notification'],
            show: ['can:view-premises-notification'],
            update: ['can:update-premises-notification'],
            destroy: ['can:delete-premises-notification'],
        }).as('guard.premises_notification');
        Route_1.default.resource('notification', 'NotificationsController').only(['index', 'store']).middleware({
            index: ['can:view-notification'],
            store: ['can:view-notification']
        }).as('guard.notification');
        Route_1.default.resource('log_book', 'LogBooksController').apiOnly().middleware({
            store: ['can:create-log-book'],
            index: ['can:view-log-book'],
            show: ['can:view-log-book'],
            update: ['can:update-log-book'],
            destroy: ['can:delete-log-book'],
        }).as('guard.log_book');
        Route_1.default.resource('guard_operation', 'GuardOperationsController').apiOnly().middleware({
            store: ['can:create-guard-operation'],
            index: ['can:view-guard-operation'],
            show: ['can:view-guard-operation'],
            update: ['can:update-guard-operation'],
            destroy: ['can:delete-guard-operation'],
        }).as('guard.guard_operation');
        Route_1.default.resource('panic_alert', 'PanicAlertsController').only(['store', 'index', 'destroy']).middleware({
            store: ['can:create-panic-alert'],
            index: ['can:view-panic-alert'],
            destroy: ['can:delete-panic-alert'],
        }).as('guard.panic_alert');
        Route_1.default.resource('checkpoint', 'CheckpointsController').apiOnly().middleware({
            store: ['can:create-checkpoint'],
            index: ['can:view-checkpoint'],
            show: ['can:view-checkpoint'],
            update: ['can:update-checkpoint'],
            destroy: ['can:delete-checkpoint'],
        }).as('guard.checkpoint');
        Route_1.default.get('schedule/list', 'SchedulesController.list').middleware('can:view-schedule').as('guard.schedule.list');
        Route_1.default.resource('schedule', 'SchedulesController').apiOnly().middleware({
            store: ['can:view-schedule'],
            index: ['can:view-schedule'],
            show: ['can:view-schedule'],
            update: ['can:update-schedule'],
            destroy: ['can:delete-schedule'],
        }).as('guard.schedule');
        Route_1.default.get('patrol_schedule/list', 'PatrolSchedulesController.list').middleware('can:view-patrol-schedule').as('guard.patrol.schedule.list');
        Route_1.default.resource('patrol_schedule', 'PatrolSchedulesController').apiOnly().middleware({
            store: ['can:create-patrol-schedule'],
            index: ['can:view-patrol-schedule'],
            show: ['can:view-patrol-schedule'],
            update: ['can:update-patrol-schedule'],
            destroy: ['can:delete-patrol-schedule'],
        }).as('guard.patrol.schedule');
        Route_1.default.resource('patrol_entry', 'PatrolEntriesController').only(['store', 'index']).middleware({
            store: ['can:create-patrol-entry'],
            index: ['can:view-patrol-entry']
        }).as('guard.patrol.entry');
        Route_1.default.resource('patrol_schedule_entry', 'PatrolScheduleEntriesController').only(['store', 'index']).middleware({
            store: ['can:create-patrol-schedule-entry'],
            index: ['can:view-patrol-schedule-entry']
        }).as('guard.patrol.schedule.entry');
        Route_1.default.resource('schedule_entry', 'ScheduleEntriesController').only(['store', 'index']).middleware({
            store: ['can:create-schedule-entry'],
            index: ['can:view-schedule-entry']
        }).as('guard.schedule.entry');
        Route_1.default.resource('attendance', 'AttendancesController').only(['index', 'store']).middleware({
            store: ['can:create-attendance'],
            index: ['can:view-attendance']
        }).as('guard.attendance');
        Route_1.default.resource('shift', 'ShiftsController').only(['index', 'show', 'store']).middleware({
            index: ['can:view-shift'],
            show: ['can:view-shift']
        }).as('guard.shift');
        Route_1.default.resource('emergency_contact', 'EmergencyContactsController').apiOnly().middleware({
            index: ['can:view-emergency-contact'],
            show: ['can:view-emergency-contact'],
            store: ['can:create-emergency-contact'],
            update: ['can:update-emergency-contact'],
            destroy: ['can:delete-emergency-contact'],
        }).as('guard.emergency.contact');
        Route_1.default.post('nearby_checkpoint', 'NearByCheckpointsController.index').middleware('can:view-checkpoint').as('gaurd.neary.checkpoints');
        Route_1.default.get('guard_supervisor', 'GuardSupervisorsController.index').middleware('can:view-staff');
        Route_1.default.post('profile/update', 'ProfilesController.update').middleware('can:update-profile').as('guard.profile.update');
    }).middleware('auth');
}).namespace('App/Controllers/Http/ClientStaff').prefix('api/guard');
//# sourceMappingURL=guard.js.map