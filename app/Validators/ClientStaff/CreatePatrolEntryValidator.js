"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreatePatrolEntryValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            message: Validator_1.schema.string.optional({}),
            audio: Validator_1.schema.file.optional({ size: '128mb' }),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            checkpointId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            dated: Validator_1.schema.date({ format: 'yyyy-MM-dd HH:mm' }),
            timezone: Validator_1.schema.string({}, [Validator_1.rules.timezone()])
        });
        this.messages = {};
    }
}
exports.default = CreatePatrolEntryValidator;
//# sourceMappingURL=CreatePatrolEntryValidator.js.map