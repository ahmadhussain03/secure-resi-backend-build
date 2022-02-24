"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddRegistrationColumnInResidents extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'residents';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('passport').nullable().alter();
            table.enu('registration_document', ['passport', 'ic', 'driving_licence', 'manual_entry', 'other']).nullable();
            table.string('registration_no').nullable();
        });
    }
    async down() {
    }
}
exports.default = AddRegistrationColumnInResidents;
//# sourceMappingURL=1645471866898_add_registration_column_in_residents.js.map