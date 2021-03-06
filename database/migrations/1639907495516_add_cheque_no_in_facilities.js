"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddChequeNoInFacilities extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'facilities';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('cheque_no').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('cheque_no');
        });
    }
}
exports.default = AddChequeNoInFacilities;
//# sourceMappingURL=1639907495516_add_cheque_no_in_facilities.js.map