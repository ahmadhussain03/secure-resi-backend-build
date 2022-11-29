"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('/login', 'LoginController.guard');
    Route_1.default.post('/project_verification', 'ProjectVerificationsController.index');
    Route_1.default.post('/client_staff/:id/search', 'ClientStaffsController.search').as('client.staff.search');
    Route_1.default.post('face_recognition', 'FaceRecognitionsController').as('guard.face.recognition');
    Route_1.default.group(() => {
        Route_1.default.get('apk', 'ApksController.index');
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.get('/permissions', 'PermissionsController.index');
        Route_1.default.resource('log_type', 'LogTypesController').only(['index']).as('guard.log_type');
        Route_1.default.resource('log_predefined_message', 'LogPreDefinedMessagesController').only(['index']).as('guard.log_predefined_message');
        Route_1.default.resource('operation_type', 'OperationTypesController').only(['index']).as('guard.operation_type');
        Route_1.default.resource('operation_predefined_message', 'OperationPreDefinedMessagesController').only(['index']).as('guard.operation_predefined_message');
        Route_1.default.resource('premises_notification', 'StaffNotificationsController').only(['index']).as('guard.premises_notification');
        Route_1.default.resource('notification', 'NotificationsController').only(['index']).as('guard.notification');
        Route_1.default.resource('log_book', 'LogBooksController').only(['store', 'index']).as('guard.log_book');
        Route_1.default.resource('guard_operation', 'GuardOperationsController').only(['store', 'index']).as('guard.guard_operation');
        Route_1.default.resource('panic_alert', 'PanicAlertsController').only(['store', 'index']).as('guard.panic_alert');
        Route_1.default.resource('checkpoint', 'CheckpointsController').only(['index', 'show', 'update']).as('guard.checkpoint');
        Route_1.default.get('schedule/list', 'SchedulesController.list').as('guard.schedule.list');
        Route_1.default.resource('schedule', 'SchedulesController').only(['index']).as('guard.schedule');
        Route_1.default.get('patrol_schedule/list', 'PatrolSchedulesController.list').as('guard.patrol.schedule.list');
        Route_1.default.resource('patrol_schedule', 'PatrolSchedulesController').only(['index']).as('guard.patrol.schedule');
        Route_1.default.get('quick_schedule_patrol/pdf/:id', 'QuickSchedulePatrolsController.pdfSingle');
        Route_1.default.resource('quick_schedule_patrol', 'QuickSchedulePatrolsController').only(['store', 'index', 'update']).as('guard.quick.schedule.patrol');
        Route_1.default.resource('patrol_entry', 'PatrolEntriesController').only(['store', 'index']).as('guard.patrol.entry');
        Route_1.default.resource('patrol_schedule_entry', 'PatrolScheduleEntriesController').only(['store', 'index']).as('guard.patrol.schedule.entry');
        Route_1.default.resource('schedule_entry', 'ScheduleEntriesController').only(['store', 'index']).as('guard.schedule.entry');
        Route_1.default.resource('attendance', 'AttendancesController').only(['index', 'store']).as('guard.attendance');
        Route_1.default.resource('shift', 'ShiftsController').only(['index', 'show', 'store']).as('guard.shift');
        Route_1.default.resource('emergency_contact', 'EmergencyContactsController').only(['index']).as('guard.emergency.contact');
        Route_1.default.post('nearby_checkpoint', 'NearByCheckpointsController.index').as('gaurd.neary.checkpoints');
        Route_1.default.get('guard_supervisor', 'GuardSupervisorsController.index');
        Route_1.default.post('profile/update', 'ProfilesController.update').as('guard.profile.update');
    }).middleware('auth');
}).namespace('App/Controllers/Http/ClientStaff').prefix('api/guard');
//# sourceMappingURL=guard.js.map