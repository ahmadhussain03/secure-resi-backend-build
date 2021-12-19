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
const MoAccount_1 = __importDefault(require("./MoAccount"));
const Unit_1 = __importDefault(require("./Unit"));
const FacilityType_1 = __importDefault(require("./FacilityType"));
class Facility extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Facility.prototype, "id", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value.toFormat('yyyy-MM-dd'),
        serialize: (value) => value.setZone('Asia/Kuala_Lumpur').toFormat('yyyy-MM-dd')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Facility.prototype, "dateFrom", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value.toFormat('yyyy-MM-dd'),
        serialize: (value) => value.setZone('Asia/Kuala_Lumpur').toFormat('yyyy-MM-dd')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Facility.prototype, "dateTo", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'Asia/Kuala_Lumpur' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Facility.prototype, "fromTime", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'Asia/Kuala_Lumpur' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Facility.prototype, "toTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Facility.prototype, "bankOption", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Facility.prototype, "chequeNo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Facility.prototype, "gatheringDescription", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Facility.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Facility.prototype, "payment", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Facility.prototype, "bankName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Facility.prototype, "transactionNumber", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Facility.prototype, "amount", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Facility.prototype, "facilityTypeId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Facility.prototype, "moAccountId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Facility.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Facility.prototype, "unitId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Facility.prototype, "projectId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Facility.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Facility.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => MoAccount_1.default),
    __metadata("design:type", Object)
], Facility.prototype, "moAccount", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Facility.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Unit_1.default),
    __metadata("design:type", Object)
], Facility.prototype, "unit", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], Facility.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => FacilityType_1.default),
    __metadata("design:type", Object)
], Facility.prototype, "facilityType", void 0);
exports.default = Facility;
//# sourceMappingURL=Facility.js.map