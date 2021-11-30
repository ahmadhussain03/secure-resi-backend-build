"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateOperationPreDefinedMessageValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'message': Validator_1.schema.string({
                trim: true,
            }, [
                Validator_1.rules.minLength(1)
            ])
        });
        this.messages = {
            'message.required': "Message field is required."
        };
    }
}
exports.default = CreateOperationPreDefinedMessageValidator;
//# sourceMappingURL=CreateOperationPreDefinedMessageValidator.js.map