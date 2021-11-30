"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class VisitorPlanVisitors extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitor_plan_visitors';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('visitor_plan_id').unsigned().references('id').inTable('visitor_plans').onDelete('CASCADE');
            table.integer('visitor_id').unsigned().references('id').inTable('visitors').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = VisitorPlanVisitors;
//# sourceMappingURL=1629100542506_visitor_plan_visitors.js.map