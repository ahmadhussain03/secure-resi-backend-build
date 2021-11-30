"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Moves extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'moves';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.enu('type', ['in', 'out']);
            table.date('date_from');
            table.date('date_to');
            table.text('description_of_goods');
            table.string('notes').nullable();
            table.string('vehicle_type');
            table.string('vehicle_no');
            table.string('driver_name');
            table.string('driver_contact_no');
            table.enu('payment', ['cash', 'bank']);
            table.string('bank_name').nullable();
            table.string('transaction_number').nullable();
            table.double('amount');
            table.integer('mo_account_id').unsigned().references('id').inTable('mo_accounts').onDelete('CASCADE').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').nullable();
            table.integer('unit_id').unsigned().references('id').inTable('units').onDelete('CASCADE').nullable();
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Moves;
//# sourceMappingURL=1629131537230_moves.js.map