"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('upload/comment/images/:filename', 'ImagesController.commentImage');
    Route_1.default.get('upload/comment/audio/:filename', 'ImagesController.commentAudio');
    Route_1.default.get('upload/improvement/images/:filename', 'ImagesController.improvementImage');
    Route_1.default.get('upload/improvement/audio/:filename', 'ImagesController.improvementAudio');
    Route_1.default.post('/login', 'AuthController.login');
    Route_1.default.post('/register', 'AuthController.register');
    Route_1.default.post('/project_verification', 'ProjectVerificationsController.index');
    Route_1.default.post('/unit_verification', 'UnitsController.verify').as('resident.unit.verify');
    Route_1.default.get('/units', 'UnitsController.index').as('resident.units');
    Route_1.default.post('face_recognition', 'FaceRecognitionsController.index').as('resident.face.recognition');
    Route_1.default.post("password_reset", "PasswordResetsController.create");
    Route_1.default.put("password_reset", "PasswordResetsController.update");
    Route_1.default.group(() => {
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.post('/logout', 'UsersController.logout');
        Route_1.default.get('/permissions', 'PermissionsController.index');
        Route_1.default.get('/improvement_type', 'ImprovementTypesController.index').middleware('can:view-panic-alert');
        Route_1.default.get('mo_account', 'MoAccountsController.index').middleware('can:view-panic-alert');
        Route_1.default.get('facility_type', 'FacilityTypesController.index').middleware('can:view-panic-alert');
        Route_1.default.get('guide_book', 'GuideBooksController.index').middleware('can:view-panic-alert');
        Route_1.default.get('move_guide_book', 'MoveGuideBooksController.index').middleware('can:view-panic-alert');
        Route_1.default.get('move_term_condition', 'MoveTermConditionsController.index').middleware('can:view-panic-alert');
        Route_1.default.get('favourite_contact_request/:code/search', 'FavouriteContactRequestsController.search').middleware('can:view-panic-alert');
        Route_1.default.post('favourite_contact_request/:code', 'FavouriteContactRequestsController.create').middleware('can:view-panic-alert');
        Route_1.default.get('my_favourite_contact_request', 'FavouriteContactRequestsController.index').middleware('can:view-panic-alert');
        Route_1.default.delete('my_favourite_contact_request/:id', 'FavouriteContactRequestsController.destroy').middleware('can:view-panic-alert');
        Route_1.default.get("favourite_contact", "FavouriteContactsController.index").middleware('can:view-panic-alert');
        Route_1.default.get("favourite_contact_request", "FavouriteContactsController.received").middleware('can:view-panic-alert');
        Route_1.default.post("favourite_contact/:id/accept", "FavouriteContactsController.accept").middleware('can:view-panic-alert');
        Route_1.default.post("favourite_contact/:id/reject", "FavouriteContactsController.reject").middleware('can:view-panic-alert');
        Route_1.default.delete("favourite_contact/:id", "FavouriteContactsController.destroy").middleware('can:view-panic-alert');
        Route_1.default.resource('notification', 'NotificationsController').only(['index', 'store']).middleware({
            index: ['can:create-panic-alert'],
            store: ['can:create-panic-alert']
        }).as('resident.notification');
        Route_1.default.resource('visitor', 'VisitorsController').apiOnly()
            .middleware({
            store: ['can:create-panic-alert'],
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            update: ['can:update-panic-alert'],
            destroy: ['can:update-panic-alert'],
        });
        Route_1.default.resource('improvement', 'ImprovementsController').apiOnly()
            .middleware({
            store: ['can:create-panic-alert'],
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            update: ['can:update-panic-alert'],
            destroy: ['can:update-panic-alert'],
        });
        Route_1.default.resource('panic_alert', 'ResidentPanicAlertsController').apiOnly().except(['destroy'])
            .middleware({
            store: ['can:create-panic-alert'],
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            update: ['can:update-panic-alert'],
        }).as('resident.panic_alert');
        Route_1.default.get('members', 'MembersController.index').middleware('can:create-panic-alert');
        Route_1.default.get('members_request', 'MembersController.request').middleware('can:create-panic-alert');
        Route_1.default.post('members_request', 'MembersController.approve').middleware('can:create-panic-alert');
        Route_1.default.post('profile/update', 'ProfilesController.update').middleware('can:create-panic-alert');
        Route_1.default.resource('emergency_contact', 'ResidentEmergencyContactsController').apiOnly().middleware({
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            store: ['can:create-panic-alert'],
            update: ['can:update-panic-alert'],
            destroy: ['can:view-panic-alert'],
        }).as('resident.emergency.contact');
        Route_1.default.resource('visitor_plan', 'VisitorPlansController').apiOnly().middleware({
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            store: ['can:create-panic-alert'],
            update: ['can:update-panic-alert'],
            destroy: ['can:view-panic-alert']
        });
        Route_1.default.resource('move', 'MovesController').apiOnly().middleware({
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            store: ['can:create-panic-alert'],
            update: ['can:update-panic-alert'],
            destroy: ['can:view-panic-alert']
        });
        Route_1.default.resource('facilities', 'FacilitiesController').apiOnly().middleware({
            index: ['can:view-panic-alert'],
            show: ['can:view-panic-alert'],
            store: ['can:create-panic-alert'],
            update: ['can:update-panic-alert'],
            destroy: ['can:view-panic-alert']
        });
        Route_1.default.put('settings', 'SettingsController.update').middleware('can:view-panic-alert');
    }).middleware('auth');
}).namespace('App/Controllers/Http/Resident').prefix('api/resident');
//# sourceMappingURL=resident.js.map