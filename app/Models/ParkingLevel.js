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
const ParkingSlot_1 = __importDefault(require("./ParkingSlot"));
class ParkingLevel extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], ParkingLevel.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ParkingLevel.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ParkingLevel.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ParkingLevel.prototype, "blockId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ParkingLevel.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ParkingLevel.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ParkingLevel.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], ParkingLevel.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Block_1.default),
    __metadata("design:type", Object)
], ParkingLevel.prototype, "block", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => ParkingSlot_1.default),
    __metadata("design:type", Object)
], ParkingLevel.prototype, "parkingSlots", void 0);
exports.default = ParkingLevel;
//# sourceMappingURL=ParkingLevel.js.map