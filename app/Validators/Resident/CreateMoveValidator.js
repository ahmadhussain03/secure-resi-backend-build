"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateMoveValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            type: Validator_1.schema.enum(['in', 'out']),
            dateFrom: Validator_1.schema.date({ format: 'yyyy-MM-dd' }),
            dateTo: Validator_1.schema.date({ format: 'yyyy-MM-dd' }),
            fromTime: Validator_1.schema.date({ format: 'hh:mm a' }),
            toTime: Validator_1.schema.date({ format: 'hh:mm a' }),
            descriptionOfGoods: Validator_1.schema.string(),
            notes: Validator_1.schema.string.optional({ trim: true }),
            vehicleType: Validator_1.schema.string({ trim: true }),
            vehicleNo: Validator_1.schema.string({ trim: true }),
            driverName: Validator_1.schema.string({ trim: true }),
            driverContactNo: Validator_1.schema.string({ trim: true }),
            payment: Validator_1.schema.enum(['cash', 'bank']),
            bankName: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.requiredWhen('payment', '=', 'bank')]),
            bankOption: Validator_1.schema.enum.optional(['Online Transfer', 'Cheque', 'Other'], [Validator_1.rules.requiredIfExists('bankName')]),
            chequeNo: Validator_1.schema.string.optional({}, [Validator_1.rules.requiredWhen('bankOption', '=', 'Cheque')]),
            transactionNumber: Validator_1.schema.string.optional({ trim: true }),
            amount: Validator_1.schema.number([]),
            moAccountId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            unitId: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        this.messages = {};
    }
}
exports.default = CreateMoveValidator;
//# sourceMappingURL=CreateMoveValidator.js.map