"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Project_1 = __importDefault(require("./Project"));
const Block_1 = __importDefault(require("./Block"));
const Level_1 = __importDefault(require("./Level"));
const Resident_1 = __importDefault(require("./Resident"));
const UnitSetting_1 = __importDefault(require("./UnitSetting"));
class Unit extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Unit.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Unit.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Unit.prototype, "blockId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Unit.prototype, "levelId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Unit.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Unit.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Unit.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], Unit.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Block_1.default),
    __metadata("design:type", Object)
], Unit.prototype, "block", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Level_1.default),
    __metadata("design:type", Object)
], Unit.prototype, "level", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Resident_1.default, {
        pivotTable: 'resident_units',
        pivotRelatedForeignKey: 'resident_id',
        pivotForeignKey: 'unit_id',
        relatedKey: 'id',
        onQuery: (query) => {
            if (!query.isRelatedSubQuery) {
                query.preload('user');
            }
        }
    }),
    __metadata("design:type", Object)
], Unit.prototype, "residents", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Resident_1.default, {
        pivotTable: 'resident_units',
        pivotRelatedForeignKey: 'resident_id',
        pivotForeignKey: 'unit_id',
        relatedKey: 'id',
        onQuery: (query) => {
            if (!query.isRelatedSubQuery) {
                query.preload('user').where('type', 'member');
            }
        }
    }),
    __metadata("design:type", Object)
], Unit.prototype, "members", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Resident_1.default, {
        pivotTable: 'resident_units',
        pivotRelatedForeignKey: 'resident_id',
        pivotForeignKey: 'unit_id',
        relatedKey: 'id',
        onQuery: (query) => {
            if (!query.isRelatedSubQuery) {
                query.preload('user');
            }
            query.where('is_approved', true).where('type', 'owner').limit(1);
        }
    }),
    __metadata("design:type", Object)
], Unit.prototype, "owner", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Resident_1.default, {
        pivotTable: 'resident_units',
        pivotRelatedForeignKey: 'resident_id',
        pivotForeignKey: 'unit_id',
        relatedKey: 'id',
        onQuery: (query) => {
            if (!query.isRelatedSubQuery) {
                query.preload('user');
            }
            query.where('type', 'owner');
        }
    }),
    __metadata("design:type", Object)
], Unit.prototype, "allOwners", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => UnitSetting_1.default),
    __metadata("design:type", Object)
], Unit.prototype, "setting", void 0);
exports.default = Unit;
//# sourceMappingURL=Unit.js.map