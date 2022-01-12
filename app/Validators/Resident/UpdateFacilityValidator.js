"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateFacilityValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            dateFrom: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd hh:mm a' }),
            dateTo: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd hh:mm a' }),
            gatheringDescription: Validator_1.schema.string.optional(),
            payment: Validator_1.schema.enum.optional(['cash', 'bank']),
            bankName: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.requiredWhen('payment', '=', 'bank')]),
            bankOption: Validator_1.schema.enum.optional(['Online Transfer', 'Cheque', 'Other'], [Validator_1.rules.requiredIfExists('bankName')]),
            chequeNo: Validator_1.schema.string.optional({}, [Validator_1.rules.requiredWhen('bankOption', '=', 'Cheque')]),
            transactionNumber: Validator_1.schema.string.optional({ trim: true }),
            amount: Validator_1.schema.number.optional([]),
            moAccountId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            facilityTypeId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()])
        });
        this.messages = {};
    }
}
exports.default = UpdateFacilityValidator;
//# sourceMappingURL=UpdateFacilityValidator.js.map