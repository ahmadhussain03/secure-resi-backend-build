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
const ParkingSlot_1 = __importDefault(require("./ParkingSlot"));
class ParkingType extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], ParkingType.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ParkingType.prototype, "customParkingType", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingType.prototype, "availableInVisitor", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => value ? luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'UTC' }).setZone('UTC').toFormat('HH:mm:ss') : null,
        serialize: (value) => value ? value.toFormat('hh:mm a') : null
    }),
    __metadata("design:type", Object)
], ParkingType.prototype, "startTime", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => value ? luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'UTC' }).setZone('UTC').toFormat('HH:mm:ss') : null,
        serialize: (value) => value ? value.toFormat('hh:mm a') : null
    }),
    __metadata("design:type", Object)
], ParkingType.prototype, "endTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingType.prototype, "allowTimeHour", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingType.prototype, "allowTimeMinute", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingType.prototype, "timeFlexibilityHour", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingType.prototype, "timeFlexibilityMinute", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingType.prototype, "overstayPenalty", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], ParkingType.prototype, "parkingFee", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ParkingType.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ParkingType.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ParkingType.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ParkingType.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], ParkingType.prototype, "project", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => ParkingSlot_1.default),
    __metadata("design:type", Object)
], ParkingType.prototype, "parkingSlots", void 0);
exports.default = ParkingType;
//# sourceMappingURL=ParkingType.js.map