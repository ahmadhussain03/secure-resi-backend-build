"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class LogBookColumns extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'log_books';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('status').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('status');
        });
    }
}
exports.default = LogBookColumns;
//# sourceMappingURL=1631694389395_log_book_columns.js.map