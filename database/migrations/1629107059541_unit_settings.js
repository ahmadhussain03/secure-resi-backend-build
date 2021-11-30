"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UnitSettings extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'unit_settings';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('unit_id').unsigned().references('id').inTable('units').onDelete('CASCADE').nullable();
            table.boolean('seek_permission').defaultTo(false);
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UnitSettings;
//# sourceMappingURL=1629107059541_unit_settings.js.map