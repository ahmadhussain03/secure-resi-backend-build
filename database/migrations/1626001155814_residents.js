"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Residents extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'residents';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('passport');
            table.enu('gender', ['male', 'female']);
            table.enu('religion', ['Hindu', 'Buddha', 'Islam', 'Other']);
            table.string('phone').nullable();
            table.string('note').nullable();
            table.string('nationality');
            table.enu('race', ['Malay', 'Indian', 'Chinese', 'Other']);
            table.date('dob');
            table.boolean('has_company').defaultTo(false);
            table.string('company_name').nullable();
            table.string('company_mobile').nullable();
            table.string('company_phone').nullable();
            table.string('company_email').nullable();
            table.string('id_card').nullable();
            table.string('sign').nullable();
            table.enu('type', ['owner', 'resident', 'member']).defaultTo('owner');
            table.enu('status', ['Active', 'Inactive']).defaultTo('Active');
            table.boolean('is_approved').defaultTo(false);
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Residents;
//# sourceMappingURL=1626001155814_residents.js.map