"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Unit_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Unit"));
class ResidentRepository {
    async create(data, request) {
        const user = await User_1.default.create({
            username: data.username,
            password: data.password,
            userType: data.userType,
            roleId: data.roleId
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
            mobileNo: data.mobileNo,
            country: data.country?.toString(),
            state: data.state?.toString(),
            city: data.city?.toString(),
            postCode: data.post_code,
            address: data.address,
            countryId: data.country,
            cityId: data.city,
            stateId: data.state
        });
        const resident = await user.related('resident').create({
            companyEmail: data.companyEmail,
            companyName: data.companyName,
            companyPhone: data.companyPhone,
            companyMobile: data.companyMobile,
            hasCompany: data.hasCompany,
            dob: data.dob,
            note: data.note,
            gender: data.gender,
            nationality: data.nationality,
            religion: data.religion,
            race: data.race,
            projectId: data.projectId,
            passport: data.passport,
            phone: data.phone,
            status: data.status,
            isApproved: data.isApproved,
            type: data.type
        });
        const idCard = request.file('idCard');
        if (idCard) {
            const fileName = `${user.id.toString()}.${idCard.extname}`;
            await idCard.move(Application_1.default.tmpPath(`profile/idCard/${user.id}`), {
                name: fileName
            });
            resident.idCard = fileName;
            await resident.save();
        }
        const sign = request.file('sign');
        if (sign) {
            const fileName = `${user.id.toString()}.${sign.extname}`;
            await sign.move(Application_1.default.tmpPath(`profile/sign/${user.id}`), {
                name: fileName
            });
            resident.sign = fileName;
            await resident.save();
        }
        await user.load('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation'));
        await user.load('resident', query => query.preload('project'));
        await user.load('role');
        if (data.unitId) {
            let unit = await Unit_1.default.query().where('project_id', data.projectId).preload('setting').where('id', data.unitId).firstOrFail();
            await user.resident.related('units').save(unit);
            await user.load('resident', (query) => query.preload('units'));
        }
        return user;
    }
    async all(request, project, residentType) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        let role = query.role ? query.role.toLowerCase() : null;
        const usersQuery = User_1.default.query().where('user_type', UserType_1.UserType.resident).whereHas('resident', (query) => {
            query.where('project_id', project.id);
            if (residentType == 'owner') {
                query.where('type', 'owner');
            }
            else if (residentType == 'member') {
                query.where('type', 'member').orWhere('type', 'resident');
            }
            else if (residentType == 'resident') {
                query.where('type', 'resident').orWhere('type', 'member');
            }
        });
        if (role) {
            usersQuery.whereHas('role', (query) => {
                query.where('name', role);
            });
        }
        const users = await usersQuery.preload('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation')).preload('resident', (query) => query.preload('units')).paginate(page, limit);
        return users;
    }
    async destroyById(id, project) {
        const user = await this.findById(id, project);
        await user.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const user = await this.findById(id, project);
        user.username = data.username ? data.username : user.username;
        user.password = data.password ? data.password : user.password;
        await user.save();
        user.profile.email = data.email ? data.email : user.profile.email;
        user.profile.name = data.name ? data.name : user.profile.name;
        user.profile.mobileNo = data.mobileNo ? data.mobileNo : user.profile.mobileNo;
        user.profile.country = data.country ? data.country?.toString() : user.profile.country;
        user.profile.state = data.state ? data.state?.toString() : user.profile.state;
        user.profile.city = data.city ? data.city?.toString() : user.profile.city;
        user.profile.countryId = data.country ? data.country : user.profile.countryId;
        user.profile.stateId = data.state ? data.state : user.profile.stateId;
        user.profile.cityId = data.city ? data.city : user.profile.cityId;
        user.profile.postCode = data.post_code ? data.post_code : user.profile.postCode;
        user.profile.address = data.address ? data.address : user.profile.address;
        await user.profile.save();
        user.resident.companyEmail = data.companyEmail ? data.companyEmail : user.resident.companyEmail;
        user.resident.companyName = data.companyName ? data.companyName : user.resident.companyName;
        user.resident.companyPhone = data.companyPhone ? data.companyPhone : user.resident.companyPhone;
        user.resident.companyMobile = data.companyMobile ? data.companyMobile : user.resident.companyMobile;
        user.resident.hasCompany = data.hasCompany ? data.hasCompany : user.resident.hasCompany;
        user.resident.dob = data.dob ? data.dob : user.resident.dob;
        user.resident.note = data.note ? data.note : user.resident.note;
        user.resident.gender = data.gender ? data.gender : user.resident.gender;
        user.resident.nationality = data.nationality ? data.nationality : user.resident.nationality;
        user.resident.religion = data.religion ? data.religion : user.resident.religion;
        user.resident.race = data.race ? data.race : user.resident.race;
        user.resident.passport = data.passport ? data.passport : user.resident.passport;
        user.resident.phone = data.phone ? data.phone : user.resident.phone;
        user.resident.status = data.status ? data.status : user.resident.status;
        user.resident.type = data.type ? data.type : user.resident.type;
        await user.resident.save();
        if (data.unitId) {
            let unit = await Unit_1.default.query().where('project_id', user.resident.projectId).preload('setting').where('id', data.unitId).firstOrFail();
            await unit.related('residents').save(user.resident, true);
        }
        await user.load('resident', (query) => {
            query.preload('units');
        });
        await user.load('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation'));
        return user;
    }
    async findById(id, project) {
        return User_1.default.query().preload('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation')).preload('resident').whereHas('resident', (query) => query.where('project_id', project.id)).where('user_type', UserType_1.UserType.resident).where('id', id).firstOrFail();
    }
    async findByOwnerId(id, project) {
        return User_1.default.query().preload('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation')).preload('resident').whereHas('resident', (query) => query.where('project_id', project.id).where('type', 'owner')).where('user_type', UserType_1.UserType.resident).where('id', id).firstOrFail();
    }
    async allByUnitIds(ids, request) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const members = await User_1.default.query().whereHas('resident', (query) => {
            query.whereHas('units', (q) => q.whereIn('id', ids));
        }).whereHas('resident', (query) => {
            query.whereIn('type', ['resident', 'member']).where('is_approved', true);
        }).preload('resident', (query) => query.preload('units')).preload('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation')).paginate(page, limit);
        return members;
    }
    async requestByUnitIds(ids, request) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const members = await User_1.default.query().whereHas('resident', (query) => {
            query.whereHas('units', (q) => q.whereIn('id', ids));
        }).whereHas('resident', (query) => {
            query.where('is_approved', false);
        }).preload('profile', query => query.preload('cityRelation').preload('countryRelation').preload('stateRelation')).preload('resident', (query) => query.preload('units')).paginate(page, limit);
        return members;
    }
}
exports.default = ResidentRepository;
//# sourceMappingURL=ResidentRepository.js.map