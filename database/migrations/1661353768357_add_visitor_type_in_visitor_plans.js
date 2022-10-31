"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitor_plans';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('visitor_type_id').unsigned().nullable().references('id').inTable('visitor_types').onDelete('CASCADE');
            table.dropColumn('visitor_type');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['visitor_type_id']);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=1661353768357_add_visitor_type_in_visitor_plans.js.map