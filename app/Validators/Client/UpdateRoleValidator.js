"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Rules_1 = require("@adonisjs/validator/build/src/Rules");
class UpdateRoleValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({}, [
                Rules_1.rules.maxLength(255)
            ]),
            permissions: Validator_1.schema.array.optional().members(Validator_1.schema.number())
        });
        this.messages = {};
    }
}
exports.default = UpdateRoleValidator;
//# sourceMappingURL=UpdateRoleValidator.js.map