"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class EmergencyContacts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'emergency_contacts';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.string('name');
            table.string('contact_no');
            table.string('image').nullable();
            table.boolean('for_resident').defaultTo(false);
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = EmergencyContacts;
//# sourceMappingURL=1622554202707_emergency_contacts.js.map