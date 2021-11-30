"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateGuardOperationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            operation: Validator_1.schema.string.optional({}),
            operationTypeId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            audio: Validator_1.schema.file.optional({ size: '128mb' }),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            status: Validator_1.schema.string.optional({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = UpdateGuardOperationValidator;
//# sourceMappingURL=UpdateGuardOperationValidator.js.map