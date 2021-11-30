"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UsersSchema extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.string('username', 255).notNullable().unique();
            table.string('password', 180).notNullable();
            table.string('remember_me_token').nullable();
            table.string('image').nullable();
            table.double('latitude').nullable();
            table.double('longitude').nullable();
            table.double('geofence_radius').nullable();
            table.string('geocode').nullable();
            table.string('device_token').nullable();
            table.enu('user_type', ['client', 'client_staff', 'admin', 'resident']).defaultTo('client');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UsersSchema;
//# sourceMappingURL=1587988332388_users.js.map