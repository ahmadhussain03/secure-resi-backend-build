"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class GuardOperationDateds extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'guard_operations';
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
exports.default = GuardOperationDateds;
//# sourceMappingURL=1637249839362_guard_operation_dateds.js.map