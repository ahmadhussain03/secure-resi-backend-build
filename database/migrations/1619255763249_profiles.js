"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Profiles extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'profiles';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id');
            table.string('name').notNullable();
            table.string('mobile_no').notNullable();
            table.string('email').notNullable();
            table.string('country').nullable();
            table.string('state').nullable();
            table.string('city').nullable();
            table.string('post_code').nullable();
            table.text('address').nullable();
            table.text('additional_information').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['user_id'], 'profiles_user_id_foreign');
        });
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Profiles;
//# sourceMappingURL=1619255763249_profiles.js.map