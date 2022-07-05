"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateLevelValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            blockId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            name: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.unique({ table: "levels", column: "name", where: { block_id: this.ctx.request.input('blockId') }, whereNot: { id: this.ctx.params.id } })]),
            status: Validator_1.schema.enum.optional(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = UpdateLevelValidator;
//# sourceMappingURL=UpdateLevelValidator.js.map