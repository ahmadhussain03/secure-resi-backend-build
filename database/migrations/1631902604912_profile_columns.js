"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ProfileColumns extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'profiles';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('country_id').unsigned().nullable().references('id').inTable('countries').onDelete('CASCADE');
            table.integer('state_id').unsigned().nullable().references('id').inTable('states').onDelete('CASCADE');
            table.integer('city_id').unsigned().nullable().references('id').inTable('cities').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('country_id');
            table.dropColumn('state_id');
            table.dropColumn('city_id');
        });
    }
}
exports.default = ProfileColumns;
//# sourceMappingURL=1631902604912_profile_columns.js.map