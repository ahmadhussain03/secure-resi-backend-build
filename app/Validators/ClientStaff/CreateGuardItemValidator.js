"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateGuardItemValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }, [Validator_1.rules.maxLength(255)]),
            description: Validator_1.schema.string({ trim: true }, [Validator_1.rules.maxLength(255)]),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' })
        });
        this.messages = {};
    }
}
exports.default = CreateGuardItemValidator;
//# sourceMappingURL=CreateGuardItemValidator.js.map