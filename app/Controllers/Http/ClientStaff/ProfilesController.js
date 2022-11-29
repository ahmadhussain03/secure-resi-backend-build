"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const ApiToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ApiToken"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const FaceRecognition_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/FaceRecognition"));
class ProfilesController {
    async update({ response, request, auth }) {
        const verificationSchema = Validator_1.schema.create({
            password: Validator_1.schema.string.optional({}, [
                Validator_1.rules.confirmed(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,255}$/)
            ]),
            password_old: Validator_1.schema.string.optional({}, [Validator_1.rules.requiredIfExists('password')]),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            address: Validator_1.schema.string.optional(),
            'mobile_no': Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.maxLength(255)
            ]),
        });
        const data = await request.validate({ schema: verificationSchema, messages: { 'password.regex': 'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 numeric & 1 special character.', 'password_old.requiredIfExists': 'Old Password is required.' } });
        const authUser = auth.user;
        if (data.password) {
            const isValidPassword = await Hash_1.default.verify(authUser.password, data.password_old);
            if (!isValidPassword)
                return response.unprocessableEntity({
                    "errors": [
                        {
                            field: "old_password",
                            message: "Old Password Does Not Match!",
                            rule: "oldPasswordMatch"
                        }
                    ]
                });
        }
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
        if (image && authUser.image) {
            const personId = await FaceRecognition_1.default.train(authUser, authUser.clientStaff.project, Application_1.default.tmpPath(`profile/images/${authUser.id}`, authUser.$original.image));
            authUser.personId = personId;
            await authUser.save();
        }
        if (data.password) {
            await ApiToken_1.default.query().whereNot('id', auth.use('api').token?.meta?.id).where('user_id', authUser.id).delete();
        }
        if (data.mobile_no) {
            authUser.profile.mobileNo = data.mobile_no;
        }
        if (data.address) {
            authUser.profile.address = data.address;
        }
        await authUser.profile.save();
        await authUser.refresh();
        return response.json(authUser);
    }
}
exports.default = ProfilesController;
//# sourceMappingURL=ProfilesController.js.map