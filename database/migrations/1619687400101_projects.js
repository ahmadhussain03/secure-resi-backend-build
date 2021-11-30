"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Projects extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'projects';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('code').notNullable();
            table.integer('no_of_checkpoints').nullable();
            table.integer('no_of_guards').nullable();
            table.integer('no_of_project_staff').nullable();
            table.integer('no_of_members').nullable();
            table.string('country').nullable();
            table.string('city').nullable();
            table.string('state').nullable();
            table.string('post_code').nullable();
            table.string('address').nullable();
            table.string('contact_person_name').nullable();
            table.string('contact_person_email').nullable();
            table.string('contact_person_designation').nullable();
            table.string('contact_person_phone').nullable();
            table.string('contact_person_fax').nullable();
            table.string('latitude').nullable();
            table.string('longitude').nullable();
            table.string('geofence_radius').nullable();
            table.string('geocode').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['user_id'], 'projects_user_id_foreign');
        });
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Projects;
//# sourceMappingURL=1619687400101_projects.js.map