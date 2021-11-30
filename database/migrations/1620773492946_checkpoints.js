"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Checkpoints extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'checkpoints';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.enu('status', ['ACTIVE', 'SUSPENDED', 'DEACTIVE', 'APPROVE']).notNullable();
            table.string('code').notNullable();
            table.string('nfc_code').nullable();
            table.string('name').notNullable();
            table.string('phone_number').nullable();
            table.text('note').nullable();
            table.double('latitude').nullable();
            table.double('longitude').nullable();
            table.double('geofence_radius').nullable();
            table.string('geocode').nullable();
            table.enu('notification_action', ['On Time', 'Before Time', 'Before Custom Time', 'After Custom Time']).nullable();
            table.string('hour').nullable();
            table.string('minute').nullable();
            table.date('reminder_datetime').nullable();
            table.string('subject').nullable();
            table.text('notification').nullable();
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
exports.default = Checkpoints;
//# sourceMappingURL=1620773492946_checkpoints.js.map