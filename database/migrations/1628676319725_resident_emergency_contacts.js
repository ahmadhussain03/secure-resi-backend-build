"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ResidentEmergencyContacts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'resident_emergency_contacts';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name');
            table.string('phone');
            table.string('image').nullable();
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
exports.default = ResidentEmergencyContacts;
//# sourceMappingURL=1628676319725_resident_emergency_contacts.js.map