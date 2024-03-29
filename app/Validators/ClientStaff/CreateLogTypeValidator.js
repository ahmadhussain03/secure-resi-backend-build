"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateLogTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({
                trim: true
            }, [
                Validator_1.rules.minLength(1),
                Validator_1.rules.alpha()
            ]),
            status: Validator_1.schema.string({}, [Validator_1.rules.maxLength(255), Validator_1.rules.alpha()]),
            statusOne: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255), Validator_1.rules.alpha()]),
            statusTwo: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255), Validator_1.rules.alpha()])
        });
        this.messages = {
            'name.required': "Name Field is required."
        };
    }
}
exports.default = CreateLogTypeValidator;
//# sourceMappingURL=CreateLogTypeValidator.js.map