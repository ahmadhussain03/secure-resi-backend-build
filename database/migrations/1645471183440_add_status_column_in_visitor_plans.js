"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddStatusColumnInVisitorPlans extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitor_plans';
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
exports.default = AddStatusColumnInVisitorPlans;
//# sourceMappingURL=1645471183440_add_status_column_in_visitor_plans.js.map