"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class GuardOperationColumns extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'guard_operations';
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
exports.default = GuardOperationColumns;
//# sourceMappingURL=1631694206116_guard_operation_columns.js.map