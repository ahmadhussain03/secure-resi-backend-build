"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateCheckInValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            planId: Validator_1.schema.number.optional([Validator_1.rules.exists({ table: 'visitor_plans', column: 'id', where: { project_id: this.ctx.auth.user?.clientStaff.projectId } })]),
            visitorType: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.exists({ table: 'visitor_types', column: 'id', where: { project_id: this.ctx.auth.user?.clientStaff.projectId } }), Validator_1.rules.requiredIfNotExists('planId')]),
            visitorEntry: Validator_1.schema.enum.optional(['single', 'multi', 'multi_vehicle', 'single_vehicle'], [Validator_1.rules.requiredIfNotExists('planId')]),
            seniors: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.requiredIfNotExists('planId')]),
            adults: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.requiredIfNotExists('planId')]),
            children: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.requiredIfNotExists('planId')]),
            infants: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.requiredIfNotExists('planId')]),
            arrivalTime: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd hh:mm' }, [Validator_1.rules.requiredIfNotExists('planId')]),
            exitTime: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd hh:mm' }, [Validator_1.rules.requiredIfNotExists('planId')]),
            purposeOfVisit: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.requiredIfNotExists('planId')]),
            noOfDays: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.requiredIfNotExists('planId')]),
            vehicleType: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            vehiclePlateNumber: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            visitors: Validator_1.schema.array.optional([Validator_1.rules.requiredIfNotExists('planId')]).members(Validator_1.schema.number([Validator_1.rules.unsigned()])),
            unitId: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.requiredIfNotExists('planId')]),
            parkingSlot: Validator_1.schema.number.optional([Validator_1.rules.unsigned(), Validator_1.rules.exists({ table: 'parking_slots', column: 'id', where: { project_id: this.ctx.auth.user?.clientStaff.projectId } })]),
            payableAmount: Validator_1.schema.number.optional([]),
            vehicleGatePass: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.exists({ table: 'gate_passes', column: 'pass_number', where: { project_id: this.ctx.auth.user?.clientStaff.projectId } })]),
            personalGatePass: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.exists({ table: 'gate_passes', column: 'pass_number', where: { project_id: this.ctx.auth.user?.clientStaff.projectId } })])
        });
        this.messages = {};
    }
}
exports.default = CreateCheckInValidator;
//# sourceMappingURL=CreateCheckInValidator.js.map