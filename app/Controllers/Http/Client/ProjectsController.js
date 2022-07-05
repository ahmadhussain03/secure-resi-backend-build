"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
const CreateProjectValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Client/CreateProjectValidator"));
const UpdateProjectValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Client/UpdateProjectValidator"));
class ProjectsController {
    async index({ request, response, auth }) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const userId = auth.user?.id;
        const projects = await Project_1.default.query().preload('cityRelation').preload('countryRelation').preload('stateRelation').where('user_id', userId).paginate(page, limit);
        return response.json(projects);
    }
    async store({ request, response, auth }) {
        const data = await request.validate(CreateProjectValidator_1.default);
        let logo = '';
        if (data.logo) {
            await data.logo.moveToDisk('./project');
            logo = data.logo.fileName;
        }
        const project = await Project_1.default.create({
            name: data.name,
            code: data.name,
            noOfCheckpoints: data.no_of_checkpoints,
            noOfGuards: data.no_of_gaurds,
            noOfProjectStaff: data.no_of_project_staff,
            noOfMembers: data.no_of_members,
            countryId: data.country,
            cityId: data.city,
            stateId: data.state,
            address: data.address,
            postCode: data.post_code,
            contactPersonName: data.contact_person_name,
            contactPersonEmail: data.contact_person_email,
            contactPersonDesignation: data.contact_person_designation,
            contactPersonPhone: data.contact_person_phone,
            contactPersonFax: data.contact_person_fax,
            latitude: data.latitude,
            longitude: data.longitude,
            geofenceRadius: data.geofence_radius,
            geocode: data.geocode,
            userId: auth.user?.id,
            logo: logo,
            status: data.status
        });
        await project.load(loader => loader.load('cityRelation').load('stateRelation').load('countryRelation'));
        return response.json(project);
    }
    async update({ response, request, params, auth }) {
        const data = await request.validate(UpdateProjectValidator_1.default);
        const userId = auth.user?.id;
        const project = await Project_1.default.query().where('id', params.id).where('user_id', userId).firstOrFail();
        let logo = '';
        if (data.logo) {
            await data.logo.moveToDisk('./project');
            logo = data.logo.fileName;
        }
        project.name = data.name ? data.name : project.name;
        project.code = data.code ? data.code : project.code;
        project.noOfCheckpoints = data.no_of_checkpoints ? data.no_of_checkpoints : project.noOfCheckpoints;
        project.noOfGuards = data.no_of_gaurds ? data.no_of_gaurds : project.noOfGuards;
        project.noOfProjectStaff = data.no_of_project_staff ? data.no_of_project_staff : project.noOfProjectStaff;
        project.noOfMembers = data.no_of_members ? data.no_of_members : project.noOfMembers;
        project.countryId = data.country ? data.country : project.countryId;
        project.cityId = data.city ? data.city : project.cityId;
        project.stateId = data.state ? data.state : project.stateId;
        project.address = data.address ? data.address : project.address;
        project.postCode = data.post_code ? data.post_code : project.postCode;
        project.contactPersonName = data.contact_person_name ? data.contact_person_name : project.contactPersonName;
        project.contactPersonEmail = data.contact_person_email ? data.contact_person_email : project.contactPersonEmail;
        project.contactPersonDesignation = data.contact_person_designation ? data.contact_person_designation : project.contactPersonDesignation;
        project.contactPersonPhone = data.contact_person_phone ? data.contact_person_phone : project.contactPersonPhone;
        project.contactPersonFax = data.contact_person_fax ? data.contact_person_fax : project.contactPersonFax;
        project.latitude = data.latitude ? data.latitude : project.latitude;
        project.longitude = data.longitude ? data.longitude : project.longitude;
        project.geofenceRadius = data.geofence_radius ? data.geofence_radius : project.geofenceRadius;
        project.geocode = data.geocode ? data.geocode : project.geocode;
        project.logo = data.logo ? logo : project.logo;
        project.status = data.status ? data.status : project.status;
        await project.save();
        await project.load(loader => loader.load('cityRelation').load('stateRelation').load('countryRelation'));
        return response.json(project);
    }
    async destroy({ response, params, auth }) {
        const userId = auth.user?.id;
        const project = await Project_1.default.query().where('id', params.id).where('user_id', userId).firstOrFail();
        await project.delete();
        return response.status(200).json({ message: 'Project Deleted Successfully!' });
    }
}
exports.default = ProjectsController;
//# sourceMappingURL=ProjectsController.js.map