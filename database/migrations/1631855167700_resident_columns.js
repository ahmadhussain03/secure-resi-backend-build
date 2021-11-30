"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ResidentColumns extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'residents';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('code').nullable().unique();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('code');
        });
    }
}
exports.default = ResidentColumns;
//# sourceMappingURL=1631855167700_resident_columns.js.map