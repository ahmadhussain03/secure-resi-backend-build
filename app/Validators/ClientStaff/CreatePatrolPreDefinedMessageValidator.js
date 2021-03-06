"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreatePatrolPreDefinedMessageValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'message': Validator_1.schema.string({}, [
                Validator_1.rules.minLength(1)
            ])
        });
        this.messages = {};
    }
}
exports.default = CreatePatrolPreDefinedMessageValidator;
//# sourceMappingURL=CreatePatrolPreDefinedMessageValidator.js.map