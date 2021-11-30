"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class StaffNotificationReads extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'staff_notification_reads';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().nullable().references('id').inTable('users').onDelete('CASCADE');
            table.integer('staff_notification_id').unsigned().nullable().references('id').inTable('staff_notifications').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = StaffNotificationReads;
//# sourceMappingURL=1624805118082_staff_notification_reads.js.map