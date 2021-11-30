"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateOperationTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({}, [
                Validator_1.rules.minLength(1)
            ]),
            status: Validator_1.schema.string({}, [Validator_1.rules.maxLength(255)]),
            statusOne: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)]),
            statusTwo: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)])
        });
        this.messages = {
            'name.required': "Name field is required."
        };
    }
}
exports.default = CreateOperationTypeValidator;
//# sourceMappingURL=CreateOperationTypeValidator.js.map