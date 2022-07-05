"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddLogoInProjects extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'projects';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('logo').nullable();
        });
    }
    async down() {
    }
}
exports.default = AddLogoInProjects;
//# sourceMappingURL=1655709347906_add_logo_in_projects.js.map