"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddColumnsInVisitors extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitors';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('country_id').unsigned().nullable().references('id').inTable('countries').onDelete('CASCADE');
            table.integer('state_id').unsigned().nullable().references('id').inTable('states').onDelete('CASCADE');
            table.integer('city_id').unsigned().nullable().references('id').inTable('cities').onDelete('CASCADE');
            table.text('address').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['country_id']);
            table.dropForeign(['state_id']);
            table.dropForeign(['city_id']);
            table.dropColumn('address');
        });
    }
}
exports.default = AddColumnsInVisitors;
//# sourceMappingURL=1640961611723_add_columns_in_visitors.js.map