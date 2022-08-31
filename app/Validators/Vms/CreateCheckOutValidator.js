"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateCheckOutValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            stayDuration: Validator_1.schema.date({ format: 'hh:mm:ss' }),
            overstayTime: Validator_1.schema.date.optional({ format: 'hh:mm:ss' }),
            overstayPenalty: Validator_1.schema.number.optional(),
            paid: Validator_1.schema.number.optional(),
            discount: Validator_1.schema.number.optional(),
            balance: Validator_1.schema.number.optional(),
            gateTerminalId: Validator_1.schema.number([Validator_1.rules.unsigned(), Validator_1.rules.exists({ table: 'gate_terminals', column: 'id', where: { 'project_id': this.ctx.auth.user?.clientStaff.projectId } })]),
            checkInId: Validator_1.schema.number([Validator_1.rules.unsigned(), Validator_1.rules.exists({ table: 'check_ins', column: 'id', where: { 'project_id': this.ctx.auth.user?.clientStaff.projectId } })])
        });
        this.messages = {};
    }
}
exports.default = CreateCheckOutValidator;
//# sourceMappingURL=CreateCheckOutValidator.js.map