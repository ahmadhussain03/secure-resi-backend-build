"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateLogBookValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            log: Validator_1.schema.string.optional({}),
            audio: Validator_1.schema.file.optional({ size: '128mb' }),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            logTypeId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            status: Validator_1.schema.string.optional({ trim: true }),
            dated: Validator_1.schema.date({ format: 'yyyy-MM-dd HH:mm' }),
            timezone: Validator_1.schema.string({}, [Validator_1.rules.timezone()])
        });
        this.messages = {
            'log.required': 'Log field is required.'
        };
    }
}
exports.default = CreateLogBookValidator;
//# sourceMappingURL=CreateLogBookValidator.js.map