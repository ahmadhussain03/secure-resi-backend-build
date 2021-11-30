"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ResidentUnits extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'resident_units';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.integer('resident_id').unsigned().references('id').inTable('residents').onDelete('CASCADE');
            table.integer('unit_id').unsigned().references('id').inTable('units').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = ResidentUnits;
//# sourceMappingURL=1627635689586_resident_units.js.map