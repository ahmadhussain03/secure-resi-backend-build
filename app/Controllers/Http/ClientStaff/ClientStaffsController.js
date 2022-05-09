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
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const qrcode_1 = __importDefault(require("qrcode"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
const fs_1 = __importDefault(require("fs"));
class ClientStaffsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        let role = query.role ? query.role.toLowerCase() : null;
        let search = query.search ?? null;
        const usersQuery = User_1.default.query().where('user_type', UserType_1.UserType.client_staff).whereHas('clientStaff', (query) => {
            query.where('project_id', projectId);
        });
        if (role) {
            usersQuery.whereHas('role', (query) => {
                query.where('name', role);
            }).preload('items');
        }
        if (search) {
            usersQuery.where((query) => {
                query.where('username', 'like', `%${search}%`).orWhereHas('clientStaff', (subQuery) => {
                    subQuery.where('nfc_code', 'like', `%${search}%`).orWhere('staff_code', 'like', `%${search}%`);
                }).orWhereHas('profile', subQuery => {
                    subQuery.where('name', 'like', `%${search}%`).orWhere('email', 'like', `%${search}%`);
                });
            });
        }
        const users = await usersQuery.preload('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation')).preload('clientStaff').preload('role').paginate(page, limit);
        return response.json(users);
    }
    async search({ response, request, params, auth }) {
        const verificationSchema = Validator_1.schema.create({
            project: Validator_1.schema.number(),
            device_token: Validator_1.schema.string()
        });
        const data = await request.validate({ schema: verificationSchema });
        const user = await User_1.default.query().whereHas('clientStaff', (query) => {
            query.where('project_id', data.project).where(query => {
                query.where('staff_code', params.id).orWhere('nfc_code', params.id);
            });
        }).where('user_type', UserType_1.UserType.client_staff).preload('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation')).preload('clientStaff').preload('role').firstOrFail();
        user.deviceToken = data.device_token;
        await user.save();
        const token = await auth.use('api').login(user);
        return response.status(200).json({ token: token.toJSON(), user: user });
    }
    async show({ response, params, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const idType = parseInt(params.id);
        if (isNaN(idType)) {
            const user = await User_1.default.query().whereHas('clientStaff', (query) => {
                query.where('project_id', projectId).where('staff_code', params.id).orWhere('nfc_code', params.id);
            }).where('user_type', UserType_1.UserType.client_staff).preload('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation')).preload('clientStaff').preload('role').firstOrFail();
            return response.json(user);
        }
        else {
            const user = await User_1.default.query().where('id', params.id).whereHas('clientStaff', (query) => {
                query.where('project_id', projectId);
            }).where('user_type', UserType_1.UserType.client_staff).preload('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation')).preload('clientStaff').preload('role').firstOrFail();
            return response.json(user);
        }
    }
    async create({ request, response, auth }) {
        const data = await request.validate(CreateClientStaffValidator_1.default);
        const authUser = auth.user;
        const role = await Role_1.default.query().where('id', data.role_id).firstOrFail();
        const user = await User_1.default.create({
            username: data.username,
            password: data.password,
            userType: UserType_1.UserType.client_staff,
            roleId: role.id,
            parentId: authUser.parentId,
            latitude: data.latitude,
            longitude: data.longitude,
            geofenceRadius: data.geofenceRadius,
            geocode: data.geocode
        });
        const image = request.file('image');
        if (image) {
            const fileName = `${user.id.toString()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`profile/images/${user.id}`), {
                name: fileName
            });
            user.image = fileName;
            await user.save();
        }
        await user.related('profile').create({
            email: data.email,
            name: data.name,
            mobileNo: data.mobile_no,
            city: data.city?.toString(),
            country: data.country?.toString(),
            state: data.state?.toString(),
            postCode: data.post_code,
            address: data.address,
            additionalInformation: data.additional_information,
            countryId: data.country,
            stateId: data.state,
            cityId: data.city
        });
        await user.related('clientStaff').create({
            staffCode: data.staff_code,
            staffId: data.staff_id,
            nfcCode: data.nfc_code,
            userId: user.id,
            projectId: authUser.clientStaff.projectId
        });
        let dir = './tmp';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        dir = './tmp/staff_code';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        dir = './tmp/staff_code/images';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        await Drive_1.default.put(`staff_code/${data.staff_code}.jpg`, await qrcode_1.default.toBuffer(data.staff_code));
        await user.load('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation'));
        await user.load('clientStaff', (query) => query.preload('project'));
        await user.load('role');
        return response.json(user);
    }
    async update({ request, response, params, auth }) {
        const data = await request.validate(UpdateClientStaffValidator_1.default);
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const user = await User_1.default.query().where('id', params.id).whereHas('clientStaff', (query) => {
            query.where('project_id', projectId);
        }).where('user_type', UserType_1.UserType.client_staff).preload('clientStaff', q => q.preload('project')).preload('profile').preload('role').firstOrFail();
        if (data.role_id && data.role_id != user.roleId) {
            let role = await Role_1.default.query().where('id', data.role_id).whereHas('user', (query) => {
                query.whereHas('clientStaff', (q) => {
                    q.where('project_id', projectId);
                });
            }).firstOrFail();
            user.roleId = role.id;
            await user.load('role');
        }
        const image = request.file('image');
        let imageName = user.image;
        if (data.remove_image && data.remove_image === true) {
            imageName = null;
        }
        if (image) {
            const fileName = `${user.id.toString()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`profile/images/${user.id}`), {
                name: fileName
            });
            imageName = fileName;
        }
        user.username = data.username ? data.username : user.username;
        user.password = data.password ? data.password : user.password;
        user.image = imageName;
        user.latitude = data.latitude ? data.latitude : user.latitude;
        user.longitude = data.longitude ? data.longitude : user.longitude;
        user.geofenceRadius = data.geofenceRadius ? data.geofenceRadius : user.geofenceRadius;
        user.geocode = data.geocode ? data.geocode : user.geocode;
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
        user.clientStaff.staffId = data.staff_id ? data.staff_id : user.clientStaff.staffId;
        user.clientStaff.nfcCode = data.nfc_code ? data.nfc_code : user.clientStaff.nfcCode;
        await user.clientStaff.save();
        if (data.staff_code) {
            await Drive_1.default.put(`staff_code/${data.staff_code}.jpg`, await qrcode_1.default.toBuffer(data.staff_code));
        }
        await user.load('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation'));
        return response.json(user);
    }
    async destroy({ response, params, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const user = await User_1.default.query().where('id', params.id).whereHas('clientStaff', (query) => {
            query.where('project_id', projectId);
        }).where('user_type', UserType_1.UserType.client_staff).firstOrFail();
        await user.delete();
        return response.status(200).json({ message: 'Staff Deleted Successfully!' });
    }
}
exports.default = ClientStaffsController;
//# sourceMappingURL=ClientStaffsController.js.map