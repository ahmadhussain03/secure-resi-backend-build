"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ResidentPanicAlertComments extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'resident_panic_alert_comments';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.text('comment');
            table.string('image').nullable();
            table.string('audio').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').nullable();
            table.integer('resident_panic_alert_id').unsigned().references('id').inTable('resident_panic_alerts').onDelete('CASCADE').nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = ResidentPanicAlertComments;
//# sourceMappingURL=1628493955669_resident_panic_alert_comments.js.map