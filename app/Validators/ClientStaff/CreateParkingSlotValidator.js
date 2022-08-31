"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateParkingSlotValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            slots: Validator_1.schema.array([Validator_1.rules.minLength(1)]).members(Validator_1.schema.object().members({
                name: Validator_1.schema.string({}, [Validator_1.rules.maxLength(255), Validator_1.rules.unique({ table: "parking_slots", column: "name", where: { parking_level_id: this.ctx.request.input('parkingLevelId') } })]),
                customSlotName: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)])
            })),
            parkingTypeId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            parkingLevelId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            allowBlockFromSlotNumber: Validator_1.schema.boolean(),
            status: Validator_1.schema.enum(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = CreateParkingSlotValidator;
//# sourceMappingURL=CreateParkingSlotValidator.js.map