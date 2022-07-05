"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/uploads/*', 'UploadsController.index');
    Route_1.default.post('/login', 'LoginController.index');
    Route_1.default.group(() => {
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.get('/client_staff', 'ClientStaffsController.index').middleware('can:view-staff');
        Route_1.default.post('/client_staff', 'ClientStaffsController.create').middleware('can:create-staff');
        Route_1.default.get('/client_staff/:id', 'ClientStaffsController.show').middleware('can:view-staff');
        Route_1.default.put('/client_staff/:id', 'ClientStaffsController.update').middleware('can:update-staff');
        Route_1.default.delete('/client_staff/:id', 'ClientStaffsController.destroy').middleware('can:delete-staff');
        Route_1.default.get('project', 'ProjectsController.index').middleware('can:view-project');
        Route_1.default.post('project', 'ProjectsController.store').middleware('can:create-project');
        Route_1.default.get('project/:id', 'ProjectsController.show').middleware('can:view-project');
        Route_1.default.put('project/:id', 'ProjectsController.update').middleware('can:update-project');
        Route_1.default.delete('project/:id', 'ProjectsController.destroy').middleware('can:delete-project');
        Route_1.default.get('/permissions', 'PermissionsController.index');
        Route_1.default.get('/role', 'RolesController.index').middleware('can:view-role');
        Route_1.default.post('/role', 'RolesController.store').middleware('can:create-role');
        Route_1.default.get('/role/:id', 'RolesController.show').middleware('can:view-role');
        Route_1.default.put('/role/:id', 'RolesController.update').middleware('can:update-role');
        Route_1.default.delete('/role/:id', 'RolesController.destroy').middleware('can:delete-role');
        Route_1.default.post('/client_staff/:id/project/:projectId', 'ClientStaffProjectsController.store').middleware('can:assign-project-staff');
        Route_1.default.delete('/client_staff/:id/project/:projectId', 'ClientStaffProjectsController.destroy').middleware('can:unassign-project-staff');
    }).middleware('auth');
}).namespace('App/Controllers/Http/Client').prefix('api/client');
//# sourceMappingURL=client.js.map