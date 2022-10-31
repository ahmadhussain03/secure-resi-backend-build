"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateQuickSchedulePatrolValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            patrolSchedule: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.exists({ table: 'patrol_schedules', column: 'id', where: { 'project_id': this.ctx.auth.user.clientStaff.projectId } })]),
            startAt: Validator_1.schema.date({ format: 'yyyy-MM-dd HH:mm' }),
            endAt: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd HH:mm' }, [Validator_1.rules.requiredWhen('status', '=', 'COMPLETED')]),
            checkpoints: Validator_1.schema.array([Validator_1.rules.minLength(1)]).members(Validator_1.schema.object().members({
                checkpoint: Validator_1.schema.number([Validator_1.rules.unsigned(), Validator_1.rules.exists({ table: 'checkpoints', column: 'id', where: { 'project_id': this.ctx.auth.user.clientStaff.projectId } })]),
                status: Validator_1.schema.boolean(),
            })),
            status: Validator_1.schema.enum(['PENDING', 'COMPLETED'])
        });
        this.messages = {};
    }
}
exports.default = CreateQuickSchedulePatrolValidator;
//# sourceMappingURL=CreateQuickSchedulePatrolValidator.js.map