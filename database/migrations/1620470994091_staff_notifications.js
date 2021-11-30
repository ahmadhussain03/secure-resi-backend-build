"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class StaffNotifications extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'staff_notifications';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.date('send_date').notNullable();
            table.string('image').nullable();
            table.string('subject').notNullable();
            table.text('comment').notNullable();
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('role_id').unsigned().nullable().references('id').inTable('roles').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = StaffNotifications;
//# sourceMappingURL=1620470994091_staff_notifications.js.map