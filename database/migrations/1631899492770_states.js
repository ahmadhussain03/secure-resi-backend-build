"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class States extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'states';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('code');
            table.string('name');
            table.integer('country_id').unsigned().references('id').inTable('countries').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = States;
//# sourceMappingURL=1631899492770_states.js.map