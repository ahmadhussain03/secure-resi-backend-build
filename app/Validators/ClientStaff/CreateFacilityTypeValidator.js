"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateFacilityTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            type: Validator_1.schema.string({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = CreateFacilityTypeValidator;
//# sourceMappingURL=CreateFacilityTypeValidator.js.map