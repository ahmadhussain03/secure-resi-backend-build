"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ScheduleEntryDateds extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'schedule_entries';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.timestamp('dated').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('dated');
        });
    }
}
exports.default = ScheduleEntryDateds;
//# sourceMappingURL=1637235173188_schedule_entry_dateds.js.map