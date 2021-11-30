"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateLogTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({
                trim: true
            }),
            status: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)]),
            statusOne: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)]),
            statusTwo: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)])
        });
        this.messages = {};
    }
}
exports.default = UpdateLogTypeValidator;
//# sourceMappingURL=UpdateLogTypeValidator.js.map