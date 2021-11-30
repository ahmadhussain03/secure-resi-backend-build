"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class PatrolEntryDateds extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'patrol_entries';
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
exports.default = PatrolEntryDateds;
//# sourceMappingURL=1637256050021_patrol_entry_dateds.js.map