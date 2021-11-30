"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const InvalidCredentialException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/InvalidCredentialException"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const FaceRecognition_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/FaceRecognition"));
const fs_1 = __importDefault(require("fs"));
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class FaceRecognitionsController {
    async index({ request, response, auth }) {
        const faceSchema = Validator_1.schema.create({
            image: Validator_1.schema.file({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            device_token: Validator_1.schema.string(),
            project: Validator_1.schema.number()
        });
        const data = await request.validate({ schema: faceSchema });
        const image = data.image;
        const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
        await image.move(Application_1.default.tmpPath(`face/images`), {
            name: fileName
        });
        const project = await Project_1.default.findOrFail(data.project);
        const uploadedImagePath = Application_1.default.tmpPath('face/images', fileName);
        const isRecognized = await FaceRecognition_1.default.detect(project, uploadedImagePath);
        if (isRecognized) {
            fs_1.default.unlinkSync(uploadedImagePath);
            const userFound = await User_1.default.query().where('id', isRecognized.id).where('user_type', UserType_1.UserType.resident).preload('resident').firstOrFail();
            if (userFound.resident.isApproved === false) {
                return response
                    .status(401)
                    .json({
                    errors: [
                        { message: 'Login Not approved yet. Wait for your login to approve than only you can register.' }
                    ]
                });
            }
            userFound.deviceToken = data.device_token;
            await userFound.save();
            await userFound.load('profile', query => query.preload('countryRelation').preload('stateRelation').preload('cityRelation'));
            await userFound.load('role', (query) => {
                query.preload('permissions', (q) => {
                    q.select(['id', 'name', 'slug']);
                });
            });
            await userFound.load('resident', (query) => {
                query.preload('project').preload('units', q => {
                    q.preload('members');
                    q.preload('residents');
                });
            });
            const token = await auth.use('api').login(userFound);
            return response.json({ token: token.toJSON(), user: userFound });
        }
        else {
            throw new InvalidCredentialException_1.default();
        }
    }
}
exports.default = FaceRecognitionsController;
//# sourceMappingURL=FaceRecognitionsController.js.map