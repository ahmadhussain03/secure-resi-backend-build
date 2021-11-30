"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Facilities extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'facilities';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.date('date_from');
            table.date('date_to');
            table.text('gathering_description');
            table.enu('payment', ['cash', 'bank']);
            table.string('bank_name').nullable();
            table.string('transaction_number').nullable();
            table.double('amount');
            table.integer('facility_type_id').unsigned().references('id').inTable('facility_types').onDelete('CASCADE');
            table.integer('mo_account_id').unsigned().references('id').inTable('mo_accounts').onDelete('CASCADE').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('unit_id').unsigned().references('id').inTable('units').onDelete('CASCADE');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Facilities;
//# sourceMappingURL=1629135492966_facilities.js.map