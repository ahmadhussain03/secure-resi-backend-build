"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateVisitorPlanValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            visitorEntry: Validator_1.schema.enum(['single', 'multi']),
            visitorType: Validator_1.schema.string({ trim: true }, [Validator_1.rules.maxLength(255)]),
            seniors: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            adults: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            children: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            infants: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            arrivalTime: Validator_1.schema.date({ format: 'yyyy-MM-dd hh:mm' }),
            exitTime: Validator_1.schema.date({ format: 'yyyy-MM-dd hh:mm' }),
            purposeOfVisit: Validator_1.schema.string({ trim: true }),
            noOfDays: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            vehicleType: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            vehiclePlateNumber: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            visitors: Validator_1.schema.array().members(Validator_1.schema.number([Validator_1.rules.unsigned()])),
            unitId: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        this.messages = {};
    }
}
exports.default = CreateVisitorPlanValidator;
//# sourceMappingURL=CreateVisitorPlanValidator.js.map