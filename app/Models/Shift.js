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
const User_1 = __importDefault(require("./User"));
const ShiftAssignItem_1 = __importDefault(require("./ShiftAssignItem"));
const ShiftNotAssignItem_1 = __importDefault(require("./ShiftNotAssignItem"));
class Shift extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Shift.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Shift.prototype, "note", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Shift.prototype, "fromId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Shift.prototype, "toId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Shift.prototype, "projectId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Shift.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Shift.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], Shift.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, {
        localKey: 'id',
        foreignKey: 'fromId'
    }),
    __metadata("design:type", Object)
], Shift.prototype, "from", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, {
        localKey: 'id',
        foreignKey: 'toId'
    }),
    __metadata("design:type", Object)
], Shift.prototype, "to", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => ShiftAssignItem_1.default),
    __metadata("design:type", Object)
], Shift.prototype, "assignItems", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => ShiftNotAssignItem_1.default),
    __metadata("design:type", Object)
], Shift.prototype, "notAssignItems", void 0);
exports.default = Shift;
//# sourceMappingURL=Shift.js.map