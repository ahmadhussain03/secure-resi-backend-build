"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateImprovementValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            improvement: Validator_1.schema.string.optional({}),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            audio: Validator_1.schema.file.optional({ size: '128mb' }),
            improvementTypeId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            unitId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            status: Validator_1.schema.string.optional({ trim: true }),
        });
        this.messages = {};
    }
}
exports.default = CreateImprovementValidator;
//# sourceMappingURL=CreateImprovementValidator.js.map