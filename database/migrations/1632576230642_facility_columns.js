"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class FacilityColumns extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'facilities';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.enu('status', ['Pending', 'Processing', 'Approved', 'Completed', 'Rejected']).defaultTo('Pending');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('status');
        });
    }
}
exports.default = FacilityColumns;
//# sourceMappingURL=1632576230642_facility_columns.js.map