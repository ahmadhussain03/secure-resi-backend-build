"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'residents';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('religion').nullable().alter();
            table.string('race').nullable().alter();
            table.integer('race_id').nullable().unsigned().references('id').inTable('races').onDelete('CASCADE');
            table.integer('religion_id').nullable().unsigned().references('id').inTable('religions').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['race_id']);
            table.dropForeign(['religion_id']);
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=1658227727061_update_resident_tables.js.map