"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentPanicAlertRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentPanicAlertRepositoryContract"));
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const FavouriteContact_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/FavouriteContact"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Fcm_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Fcm"));
class ResidentPanicAlertsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unitId = query.unit;
        const unit = await UnitRepositoryContract_1.default.findById(unitId, project);
        const alerts = await ResidentPanicAlertRepositoryContract_1.default.allByUnit(request, unit);
        return response.json(alerts);
    }
    async show({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unitId = query.unit || '0';
        const id = params.id;
        const unit = await UnitRepositoryContract_1.default.findById(unitId, project);
        const alert = await ResidentPanicAlertRepositoryContract_1.default.findByIdByUnit(id, unit);
        return response.json(alert);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const alertSchema = Validator_1.schema.create({
            unitId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
        });
        const validatedData = await request.validate({ schema: alertSchema });
        await UnitRepositoryContract_1.default.findById(validatedData.unitId, project);
        let data = {
            userId: authUser.id,
            projectId: project.id,
            unitId: validatedData.unitId
        };
        const alert = await ResidentPanicAlertRepositoryContract_1.default.create(data);
        const favouriteContacts = await FavouriteContact_1.default.query().where('user_id', authUser.id).preload('favourite', query => query.whereNotNull('device_token').whereNot('id', authUser.id));
        favouriteContacts.forEach(contact => {
            Fcm_1.default.sendNotification(contact?.favourite?.deviceToken, {
                payload: {
                    notification: {
                        title: 'Panic Alert',
                        body: `${authUser?.username} has generated a panic alert`
                    },
                    data: {
                        type: 'panic'
                    }
                }
            });
        });
        const unitMembers = await User_1.default.query().whereHas('resident', query => {
            query.whereHas('units', q => q.where('id', data.unitId)).where(query => query.where('type', 'resident').orWhere('type', 'member'));
        });
        unitMembers.forEach(member => {
            Fcm_1.default.sendNotification(member?.deviceToken, {
                payload: {
                    notification: {
                        title: 'Panic Alert',
                        body: `${authUser?.username} has generated a panic alert`
                    },
                    data: {
                        type: 'panic'
                    }
                }
            });
        });
        return response.json(alert);
    }
    async update({ request, response, auth, params }) {
        const alertCommentSchema = Validator_1.schema.create({
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            audio: Validator_1.schema.file.optional({ size: '128mb' }),
            comment: Validator_1.schema.string({ trim: true }),
            unitId: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        const data = await request.validate({ schema: alertCommentSchema });
        const authUser = auth.user;
        const project = authUser?.resident.project;
        data.userId = authUser.id;
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        const alert = await ResidentPanicAlertRepositoryContract_1.default.findByIdByUnitAndUpdate(params.id, unit, data, request);
        return response.json(alert);
    }
}
exports.default = ResidentPanicAlertsController;
//# sourceMappingURL=ResidentPanicAlertsController.js.map