"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ItemRepositoryContract"));
const UpdateGuardItemValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateGuardItemValidator"));
const CreateGuardItemValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGuardItemValidator"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ItemsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const items = await ItemRepositoryContract_1.default.all(request, project);
        return response.json(items);
    }
    async report({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const items = await ItemRepositoryContract_1.default.all(request, project);
        return response.json(items);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateGuardItemValidator_1.default);
        data.projectId = project.id;
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('guard_item/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const item = await ItemRepositoryContract_1.default.create(data);
        return response.json(item);
    }
    async update({ response, request, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(UpdateGuardItemValidator_1.default);
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('guard_item/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const item = await ItemRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(item);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await ItemRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: "Guard Item Deleted Successfully" });
    }
    async assign({ response, request }) {
        const assignSchema = Validator_1.schema.create({
            guardId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            items: Validator_1.schema.array([Validator_1.rules.minLength(1)]).members(Validator_1.schema.number([Validator_1.rules.unsigned()])),
        });
        const data = await request.validate({ schema: assignSchema });
        const user = await User_1.default.findOrFail(data.guardId);
        await user.related('items').sync(data.items);
        await user.load('items');
        return response.json(user);
    }
}
exports.default = ItemsController;
//# sourceMappingURL=ItemsController.js.map