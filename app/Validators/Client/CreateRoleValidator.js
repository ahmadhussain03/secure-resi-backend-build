"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Rules_1 = require("@adonisjs/validator/build/src/Rules");
class CreateRoleValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({}, [
                Rules_1.rules.maxLength(255),
                Rules_1.rules.unique({ table: 'roles', column: 'name' })
            ]),
            permissions: Validator_1.schema.array([Rules_1.rules.minLength(1)]).members(Validator_1.schema.number())
        });
        this.messages = {};
    }
}
exports.default = CreateRoleValidator;
//# sourceMappingURL=CreateRoleValidator.js.map