"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const PasswordReset_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PasswordReset"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
class PasswordResetsController {
    async create({ request, response }) {
        const verificationSchema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [Validator_1.rules.email()])
        });
        const data = await request.validate({ schema: verificationSchema });
        const user = await User_1.default.query().whereHas('profile', (query) => {
            query.where('email', data.email);
        }).firstOrFail();
        const code = Math.floor(100000 + Math.random() * 900000);
        const previousResetCode = await PasswordReset_1.default.query().where('user_id', user.id).first();
        if (previousResetCode)
            await previousResetCode.delete();
        await PasswordReset_1.default.create({
            verificationCode: await Hash_1.default.make(code.toString()),
            userId: user.id
        });
        await Mail_1.default.sendLater((message) => {
            message
                .from('forgot-password@secureresi.com')
                .to(data.email)
                .subject('Password Reset Code!')
                .htmlView('emails/reset', { code: code, user: user });
        });
        return response.json({ message: "Verification Code Sent Successfully!" });
    }
    async update({ request, response }) {
        const verificationSchema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [Validator_1.rules.email()]),
            code: Validator_1.schema.string({ trim: true }),
            password: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.confirmed(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,255}$/)
            ])
        });
        const data = await request.validate({ schema: verificationSchema, messages: { 'password.regex': 'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 numeric & 1 special character.' } });
        const user = await User_1.default.query().whereHas('profile', query => {
            query.where('email', data.email);
        }).firstOrFail();
        const resetCode = await PasswordReset_1.default.query().where('user_id', user.id).first();
        if (resetCode && await Hash_1.default.verify(resetCode.verificationCode, data.code)) {
            user.password = data.password;
            await user.save();
            await resetCode.delete();
            return response.json({ message: "Password Updated Successfully!" });
        }
        else {
            return response.notFound({ message: 'Code Does Not Match!' });
        }
    }
}
exports.default = PasswordResetsController;
//# sourceMappingURL=PasswordResetsController.js.map