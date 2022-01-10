"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const ApiToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ApiToken"));
class ProfilesController {
    async update({ response, request, auth }) {
        const verificationSchema = Validator_1.schema.create({
            password: Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.confirmed(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,255}$/)
            ]),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' })
        });
        const data = await request.validate({ schema: verificationSchema, messages: { 'password.regex': 'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 numeric & 1 special character.' } });
        const authUser = auth.user;
        const image = request.file('image');
        let imageName = "";
        if (image) {
            const fileName = `${authUser.id.toString()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`profile/images/${authUser.id}`), {
                name: fileName
            });
            imageName = fileName;
        }
        authUser.password = data.password ? data.password : authUser.password;
        authUser.image = imageName ? imageName : authUser.image;
        await authUser.save();
        if (data.password) {
            await ApiToken_1.default.query().whereNot('id', auth.use('api').token?.meta?.id).where('user_id', authUser.id).delete();
        }
        await authUser.refresh();
        return response.json(authUser);
    }
}
exports.default = ProfilesController;
//# sourceMappingURL=ProfilesController.js.map