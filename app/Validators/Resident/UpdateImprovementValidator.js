"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateImprovementValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            improvement: Validator_1.schema.string.optional({}),
            improvementTypeId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            audio: Validator_1.schema.file.optional({ size: '128mb' }),
            status: Validator_1.schema.string.optional({ trim: true }),
        });
        this.messages = {};
    }
}
exports.default = UpdateImprovementValidator;
//# sourceMappingURL=UpdateImprovementValidator.js.map