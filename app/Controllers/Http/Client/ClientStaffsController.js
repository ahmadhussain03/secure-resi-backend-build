"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateClientStaffValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Client/CreateClientStaffValidator"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const UpdateClientStaffValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Client/UpdateClientStaffValidator"));
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
class ClientStaffsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const users = await User_1.default.query().where('user_type', UserType_1.UserType.client_staff).where('parent_id', authUser.id).preload('profile').preload('clientStaff').preload('role').paginate(page, limit);
        return response.json(users);
    }
    async show({ response, params, auth }) {
        const authUser = auth.user;
        const user = await User_1.default.query().where('id', params.id).where('parent_id', authUser.id).where('user_type', UserType_1.UserType.client_staff).preload('profile').preload('clientStaff').preload('role').firstOrFail();
        return response.json(user);
    }
    async create({ request, response, auth }) {
        const data = await request.validate(CreateClientStaffValidator_1.default);
        const authUser = auth.user;
        const role = await Role_1.default.query().where('id', data.role_id).where('user_id', authUser.id).firstOrFail();
        const project = await Project_1.default.query().where('id', data.project_id).where('user_id', authUser.id).firstOrFail();
        const user = await User_1.default.create({
            username: data.username,
            password: data.password,
            userType: UserType_1.UserType.client_staff,
            roleId: role.id,
            parentId: authUser.id
        });
        await user.related('profile').create({
            email: data.email,
            name: data.name,
            mobileNo: data.mobile_no,
            city: data.city?.toString(),
            country: data.country?.toString(),
            state: data.state?.toString(),
            cityId: data.city,
            countryId: data.country,
            stateId: data.state,
            postCode: data.post_code,
            address: data.address,
            additionalInformation: data.additional_information
        });
        await user.related('clientStaff').create({
            staffCode: data.staff_code,
            nfcCode: data.nfc_code,
            userId: user.id,
            projectId: project.id
        });
        await user.load('profile');
        await user.load('clientStaff');
        await user.load('role');
        return response.json(user);
    }
    async update({ request, response, params, auth }) {
        const data = await request.validate(UpdateClientStaffValidator_1.default);
        const authUser = auth.user;
        const user = await User_1.default.query().where('id', params.id).where('parent_id', authUser.id).where('user_type', UserType_1.UserType.client_staff).preload('clientStaff').preload('profile').preload('role').firstOrFail();
        if (data.role_id && data.role_id != user.roleId) {
            let role = await Role_1.default.query().where('id', data.role_id).where('user_id', authUser.id).firstOrFail();
            user.roleId = role.id;
            await user.load('role');
        }
        if (data.project_id && data.project_id != user.clientStaff.projectId) {
            const project = await Project_1.default.query().where('id', data.project_id).where('user_id', authUser.id).firstOrFail();
            user.clientStaff.projectId = project.id;
            await user.load('clientStaff');
        }
        user.username = data.username ? data.username : user.username;
        user.password = data.password ? data.password : user.password;
        await user.save();
        user.profile.email = data.email ? data.email : user.profile.email;
        user.profile.name = data.name ? data.name : user.profile.name;
        user.profile.mobileNo = data.mobile_no ? data.mobile_no : user.profile.mobileNo;
        user.profile.country = data.country ? data.country.toString() : user.profile.country;
        user.profile.countryId = data.country ? data.country : user.profile.countryId;
        user.profile.state = data.state ? data.state.toString() : user.profile.state;
        user.profile.stateId = data.state ? data.state : user.profile.stateId;
        user.profile.city = data.city ? data.city.toString() : user.profile.city;
        user.profile.cityId = data.city ? data.city : user.profile.cityId;
        user.profile.address = data.address ? data.address : user.profile.address;
        user.profile.additionalInformation = data.additional_information ? data.additional_information : user.profile.additionalInformation;
        user.profile.postCode = data.post_code ? data.post_code : user.profile.postCode;
        await user.profile.save();
        user.clientStaff.staffCode = data.staff_code ? data.staff_code : user.clientStaff.staffCode;
        user.clientStaff.nfcCode = data.nfc_code ? data.nfc_code : user.clientStaff.nfcCode;
        await user.clientStaff.save();
        return response.json(user);
    }
    async destroy({ response, params, auth }) {
        const authUser = auth.user;
        const user = await User_1.default.query().where('id', params.id).where('parent_id', authUser.id).where('user_type', UserType_1.UserType.client_staff).firstOrFail();
        await user.delete();
        return response.status(200).json({ message: 'Staff Deleted Successfully!' });
    }
}
exports.default = ClientStaffsController;
//# sourceMappingURL=ClientStaffsController.js.map