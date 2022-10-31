"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateLogTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({
                trim: true
            }, [Validator_1.rules.alpha()]),
            status: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255), Validator_1.rules.alpha()]),
            statusOne: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255), Validator_1.rules.alpha()]),
            statusTwo: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255), Validator_1.rules.alpha()])
        });
        this.messages = {};
    }
}
exports.default = UpdateLogTypeValidator;
//# sourceMappingURL=UpdateLogTypeValidator.js.map