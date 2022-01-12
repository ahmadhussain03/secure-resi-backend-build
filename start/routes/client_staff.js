"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/uploads/*', 'UploadsController.index');
    Route_1.default.get('upload/patrol_entry/images/:filename', 'ImagesController.patrolEntryImage');
    Route_1.default.get('upload/patrol_entry/audio/:filename', 'ImagesController.patrolEntryAudio');
    Route_1.default.get('upload/patrol_schedule_entry/images/:filename', 'ImagesController.patrolScheduleEntryImage');
    Route_1.default.get('upload/patrol_schedule_entry/audio/:filename', 'ImagesController.patrolScheduleEntryAudio');
    Route_1.default.get('upload/schedule_entry/images/:filename', 'ImagesController.scheduleEntryImage');
    Route_1.default.get('upload/schedule_entry/audio/:filename', 'ImagesController.scheduleEntryAudio');
    Route_1.default.get('upload/guard_operation/images/:filename', 'ImagesController.guardOperationImage');
    Route_1.default.get('upload/guard_operation/audio/:filename', 'ImagesController.guardOperationAudio');
    Route_1.default.get('upload/guard_item/images/:filename', 'ImagesController.guardItemImage');
    Route_1.default.get('upload/staff_notification/images/:filename', 'ImagesController.staffNotificationImage');
    Route_1.default.get('upload/profile/images/:filename', 'ImagesController.profileImage');
    Route_1.default.get('upload/emergency_contact/images/:filename', 'ImagesController.emergencyContactImage');
    Route_1.default.get('upload/qr_code/images/:filename', 'ImagesController.qrCodeImage');
    Route_1.default.post('/login', 'LoginController.index');
    Route_1.default.post('face_recognition', 'FaceRecognitionsController.index');
    Route_1.default.post('fingerprint_login', 'FingerprintsController.index');
    Route_1.default.group(() => {
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.post('/logout', 'UsersController.logout');
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
        });
        Route_1.default.resource('log_predefined_message', 'LogPreDefinedMessagesController').apiOnly().middleware({
            store: ['can:create-log-pre-defined-message'],
            index: ['can:view-log-pre-defined-message'],
            show: ['can:view-log-pre-defined-message'],
            update: ['can:update-log-pre-defined-message'],
            destroy: ['can:delete-log-pre-defined-message'],
        });
        Route_1.default.resource('operation_type', 'OperationTypesController').apiOnly().middleware({
            store: ['can:create-operation-type'],
            index: ['can:view-operation-type'],
            show: ['can:view-operation-type'],
            update: ['can:update-operation-type'],
            destroy: ['can:delete-operation-type'],
        });
        Route_1.default.resource('operation_predefined_message', 'OperationPreDefinedMessagesController').apiOnly().middleware({
            store: ['can:create-operation-pre-defined-message'],
            index: ['can:view-operation-pre-defined-message'],
            show: ['can:view-operation-pre-defined-message'],
            update: ['can:update-operation-pre-defined-message'],
            destroy: ['can:delete-operation-pre-defined-message'],
        });
        Route_1.default.resource('patrol_predefined_message', 'PatrolPreDefinedMessagesController').apiOnly().middleware({
            store: ['can:create-patrol-pre-defined-message'],
            index: ['can:view-patrol-pre-defined-message'],
            show: ['can:view-patrol-pre-defined-message'],
            update: ['can:update-patrol-pre-defined-message'],
            destroy: ['can:delete-patrol-pre-defined-message'],
        });
        Route_1.default.resource('premises_notification', 'StaffNotificationsController').apiOnly().middleware({
            store: ['can:create-premises-notification'],
            index: ['can:view-premises-notification'],
            show: ['can:view-premises-notification'],
            update: ['can:update-premises-notification'],
            destroy: ['can:delete-premises-notification'],
        });
        Route_1.default.resource('notification', 'NotificationsController').only(['index', 'store']).middleware({
            index: ['can:view-notification'],
            store: ['can:view-notification']
        });
        Route_1.default.resource('log_book', 'LogBooksController').apiOnly().middleware({
            store: ['can:create-log-book'],
            index: ['can:view-log-book'],
            show: ['can:view-log-book'],
            update: ['can:update-log-book'],
            destroy: ['can:delete-log-book'],
        });
        Route_1.default.resource('guard_operation', 'GuardOperationsController').apiOnly().middleware({
            store: ['can:create-guard-operation'],
            index: ['can:view-guard-operation'],
            show: ['can:view-guard-operation'],
            update: ['can:update-guard-operation'],
            destroy: ['can:delete-guard-operation'],
        });
        Route_1.default.resource('panic_alert', 'PanicAlertsController').only(['store', 'index', 'destroy']).middleware({
            store: ['can:create-panic-alert'],
            index: ['can:view-panic-alert'],
            destroy: ['can:delete-panic-alert'],
        });
        Route_1.default.resource('checkpoint', 'CheckpointsController').apiOnly().middleware({
            store: ['can:create-checkpoint'],
            index: ['can:view-checkpoint'],
            show: ['can:view-checkpoint'],
            update: ['can:update-checkpoint'],
            destroy: ['can:delete-checkpoint'],
        });
        Route_1.default.get('schedule/list', 'SchedulesController.list').middleware('can:view-schedule');
        Route_1.default.resource('schedule', 'SchedulesController').apiOnly().middleware({
            store: ['can:create-schedule'],
            index: ['can:view-schedule'],
            show: ['can:view-schedule'],
            update: ['can:update-schedule'],
            destroy: ['can:delete-schedule'],
        });
        Route_1.default.get('patrol_schedule/list', 'PatrolSchedulesController.list').middleware('can:view-patrol-schedule');
        Route_1.default.resource('patrol_schedule', 'PatrolSchedulesController').apiOnly().middleware({
            store: ['can:create-patrol-schedule'],
            index: ['can:view-patrol-schedule'],
            show: ['can:view-patrol-schedule'],
            update: ['can:update-patrol-schedule'],
            destroy: ['can:delete-patrol-schedule'],
        });
        Route_1.default.resource('patrol_entry', 'PatrolEntriesController').only(['store', 'index']).middleware({
            store: ['can:create-patrol-entry'],
            index: ['can:view-patrol-entry']
        });
        Route_1.default.resource('patrol_schedule_entry', 'PatrolScheduleEntriesController').only(['store', 'index', 'show']).middleware({
            store: ['can:create-patrol-schedule-entry'],
            index: ['can:view-patrol-schedule-entry'],
            show: ['can:view-patrol-schedule-entry']
        });
        Route_1.default.resource('schedule_entry', 'ScheduleEntriesController').only(['store', 'index']).middleware({
            store: ['can:create-schedule-entry'],
            index: ['can:view-schedule-entry']
        });
        Route_1.default.resource('attendance', 'AttendancesController').only(['index', 'store']).middleware({
            store: ['can:create-attendance'],
            index: ['can:view-attendance']
        });
        Route_1.default.resource('item', 'ItemsController').apiOnly().middleware({
            store: ['can:create-guard-item'],
            index: ['can:view-guard-item'],
            show: ['can:view-guard-item'],
            update: ['can:update-guard-item'],
            destroy: ['can:delete-guard-item'],
        });
        Route_1.default.post('item/assign', 'ItemsController.assign').middleware('can:assign-guard-item');
        Route_1.default.resource('shift', 'ShiftsController').only(['index', 'show', 'store']).middleware({
            index: ['can:view-shift'],
            show: ['can:view-shift']
        });
        Route_1.default.resource('emergency_contact', 'EmergencyContactsController').apiOnly().middleware({
            index: ['can:view-emergency-contact'],
            show: ['can:view-emergency-contact'],
            store: ['can:create-emergency-contact'],
            update: ['can:update-emergency-contact'],
            destroy: ['can:delete-emergency-contact'],
        });
        Route_1.default.post('profile/update', 'ProfilesController.update').middleware('can:update-profile');
        Route_1.default.resource('block', 'BlocksController').apiOnly().middleware({
            index: ['can:view-block'],
            show: ['can:view-block'],
            store: ['can:create-block'],
            update: ['can:update-block'],
            destroy: ['can:delete-block'],
        });
        Route_1.default.resource('level', 'LevelsController').apiOnly().middleware({
            index: ['can:view-level'],
            store: ['can:create-level'],
            update: ['can:update-level'],
            destroy: ['can:delete-level'],
        });
        Route_1.default.resource('unit', 'UnitsController').apiOnly().middleware({
            index: ['can:view-unit'],
            show: ['can:view-unit'],
            store: ['can:create-unit'],
            update: ['can:update-unit'],
            destroy: ['can:delete-unit']
        });
        Route_1.default.resource('owner', 'OwnersController').apiOnly().middleware({
            index: ['can:view-owner'],
            show: ['can:view-owner'],
            store: ['can:create-owner'],
            update: ['can:update-owner'],
            destroy: ['can:delete-owner']
        });
        Route_1.default.get('owner_request', 'OwnerRequestsController.index').middleware('can:view-owner');
        Route_1.default.post('owner_request', 'OwnerRequestsController.approve').middleware('can:create-owner');
        Route_1.default.delete('owner_request', 'OwnerRequestsController.reject').middleware('can:delete-owner');
        Route_1.default.resource('resident', 'ResidentsController').apiOnly().middleware({
            index: ['can:view-resident'],
            show: ['can:view-resident'],
            store: ['can:create-resident'],
            update: ['can:update-resident'],
            destroy: ['can:delete-resident']
        });
        Route_1.default.resource('mo_account', 'MoAccountsController').apiOnly().except(['show']).middleware({
            index: ['can:view-mo-account'],
            store: ['can:create-mo-account'],
            update: ['can:update-mo-account'],
            destroy: ['can:delete-mo-account']
        });
        Route_1.default.resource('facility_type', 'FacilityTypesController').apiOnly().except(['show']).middleware({
            index: ['can:view-facility-type'],
            store: ['can:create-facility-type'],
            update: ['can:update-facility-type'],
            destroy: ['can:delete-facility-type']
        });
        Route_1.default.resource('guide_book', 'GuideBooksController').apiOnly().middleware({
            index: ['can:view-guide-book'],
            show: ['can:view-guide-book'],
            store: ['can:create-guide-book'],
            update: ['can:update-guide-book'],
            destroy: ['can:delete-guide-book']
        });
        Route_1.default.resource('move_guide_book', 'MoveGuideBooksController').apiOnly().except(['show']).middleware({
            index: ['can:view-guide-book'],
            store: ['can:create-guide-book'],
            update: ['can:update-guide-book'],
            destroy: ['can:delete-guide-book']
        });
        Route_1.default.resource('move_term_condition', 'MoveTermConditionsController').apiOnly().middleware({
            index: ['can:view-guide-book'],
            show: ['can:view-guide-book'],
            store: ['can:create-guide-book'],
            update: ['can:update-guide-book'],
            destroy: ['can:delete-guide-book']
        });
        Route_1.default.resource('improvement_type', 'ImprovementTypesController').apiOnly().middleware({
            store: ['can:create-operation-type'],
            index: ['can:view-operation-type'],
            show: ['can:view-operation-type'],
            update: ['can:update-operation-type'],
            destroy: ['can:delete-operation-type'],
        });
        Route_1.default.get('improvement', 'ImprovementsController.index').middleware('can:create-operation-type');
        Route_1.default.put('improvement/:id', 'ImprovementsController.update').middleware('can:update-operation-type');
        Route_1.default.get('move', 'MovesController.index').middleware('can:create-operation-type');
        Route_1.default.put('move/:id', 'MovesController.update').middleware('can:update-operation-type');
        Route_1.default.get('facilities', 'FacilitiesController.index').middleware('can:create-operation-type');
        Route_1.default.put('facilities/:id', 'FacilitiesController.update').middleware('can:update-operation-type');
        Route_1.default.post('fingerprint', 'FingerprintsController.create');
    }).middleware('auth');
}).namespace('App/Controllers/Http/ClientStaff').prefix('api/staff');
//# sourceMappingURL=client_staff.js.map