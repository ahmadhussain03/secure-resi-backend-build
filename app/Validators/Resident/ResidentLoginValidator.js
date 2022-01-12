"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ResidentLoginValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.cacheKey = this.ctx.routeKey;
        this.schema = Validator_1.schema.create({
            'username': Validator_1.schema.string({}, [
                Validator_1.rules.maxLength(255)
            ]),
            'password': Validator_1.schema.string({}, [
                Validator_1.rules.minLength(6),
                Validator_1.rules.maxLength(255)
            ]),
            'project': Validator_1.schema.number([Validator_1.rules.unsigned()]),
            'device_token': Validator_1.schema.string({ trim: true })
        });
        this.messages = {
            'username.required': 'Username field is required.',
            'username.maxLength': 'Username field must be maximum 255 characters.',
            'password.required': 'Password field is required.',
            'password.minLength': 'Password field must be atleast 6 characters.',
            'password.maxLength': 'Password field must be maximum 255 characters.'
        };
    }
}
exports.default = ResidentLoginValidator;
//# sourceMappingURL=ResidentLoginValidator.js.map