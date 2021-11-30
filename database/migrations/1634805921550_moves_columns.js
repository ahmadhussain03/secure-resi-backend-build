"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class MovesColumns extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'moves';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.time('from_time');
            table.time('to_time');
            table.enu('bank_option', ['Online Transfer', 'Cheque', 'Other']).nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('from_time');
            table.dropColumn('to_time');
            table.dropColumn('bank_option');
        });
    }
}
exports.default = MovesColumns;
//# sourceMappingURL=1634805921550_moves_columns.js.map