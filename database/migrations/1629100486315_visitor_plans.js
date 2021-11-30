"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class VisitorPlans extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitor_plans';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.enu('visitor_entry', ['single', 'multi']);
            table.string('visitor_type');
            table.integer('seniors');
            table.integer('adults');
            table.integer('children');
            table.integer('infants');
            table.dateTime('arrival_time');
            table.dateTime('exit_time');
            table.text('purpose_of_visit');
            table.integer('no_of_days');
            table.string('vehicle_type').nullable();
            table.string('vehicle_plate_number').nullable();
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
exports.default = VisitorPlans;
//# sourceMappingURL=1629100486315_visitor_plans.js.map