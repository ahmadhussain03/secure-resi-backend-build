"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateBlockValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255), Validator_1.rules.unique({ table: 'blocks', column: 'name', where: { project_id: this.ctx.auth.user?.clientStaff.projectId }, whereNot: { id: this.ctx.params.id } })]),
            status: Validator_1.schema.enum.optional(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = UpdateBlockValidator;
//# sourceMappingURL=UpdateBlockValidator.js.map