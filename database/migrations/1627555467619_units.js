"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Units extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'units';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.enu('status', ['Active', 'Inactive']);
            table.string('name');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('block_id').unsigned().references('id').inTable('blocks').onDelete('CASCADE');
            table.integer('level_id').unsigned().references('id').inTable('levels').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Units;
//# sourceMappingURL=1627555467619_units.js.map