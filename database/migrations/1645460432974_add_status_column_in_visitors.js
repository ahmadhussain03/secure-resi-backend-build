"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddStatusColumnInVisitorPlanVisitors extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitors';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('status').defaultTo('Pending').index();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('status');
        });
    }
}
exports.default = AddStatusColumnInVisitorPlanVisitors;
//# sourceMappingURL=1645460432974_add_status_column_in_visitors.js.map