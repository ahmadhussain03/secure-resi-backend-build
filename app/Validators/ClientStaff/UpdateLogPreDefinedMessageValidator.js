"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateLogPreDefinedMessageValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'message': Validator_1.schema.string.optional({})
        });
        this.messages = {};
    }
}
exports.default = UpdateLogPreDefinedMessageValidator;
//# sourceMappingURL=UpdateLogPreDefinedMessageValidator.js.map