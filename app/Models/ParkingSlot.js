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
const ParkingLevel_1 = __importDefault(require("./ParkingLevel"));
const ParkingType_1 = __importDefault(require("./ParkingType"));
const Project_1 = __importDefault(require("./Project"));
const CheckIn_1 = __importDefault(require("./CheckIn"));
class ParkingSlot extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ParkingSlot.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingSlot.prototype, "customSlotName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ParkingSlot.prototype, "allowBlockFromSlotNumber", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "parkingLevelId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "parkingTypeId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ParkingSlot.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ParkingSlot.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ParkingSlot.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => ParkingLevel_1.default),
    __metadata("design:type", Object)
], ParkingSlot.prototype, "parkingLevel", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => ParkingType_1.default),
    __metadata("design:type", Object)
], ParkingSlot.prototype, "parkingType", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], ParkingSlot.prototype, "project", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => CheckIn_1.default),
    __metadata("design:type", Object)
], ParkingSlot.prototype, "checkIns", void 0);
exports.default = ParkingSlot;
//# sourceMappingURL=ParkingSlot.js.map