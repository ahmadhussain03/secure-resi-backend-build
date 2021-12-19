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
const MoAccount_1 = __importDefault(require("./MoAccount"));
const User_1 = __importDefault(require("./User"));
const Unit_1 = __importDefault(require("./Unit"));
const Project_1 = __importDefault(require("./Project"));
class Move extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Move.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "type", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value.toFormat('yyyy-MM-dd'),
        serialize: (value) => value.setZone('Asia/Kuala_Lumpur').toFormat('yyyy-MM-dd')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Move.prototype, "dateFrom", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value.toFormat('yyyy-MM-dd'),
        serialize: (value) => value.setZone('Asia/Kuala_Lumpur').toFormat('yyyy-MM-dd')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Move.prototype, "dateTo", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'Asia/Kuala_Lumpur' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Move.prototype, "fromTime", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'Asia/Kuala_Lumpur' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], Move.prototype, "toTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "bankOption", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "chequeNo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "descriptionOfGoods", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "notes", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "vehicleType", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "vehicleNo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "driverName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "driverContactNo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "payment", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "bankName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Move.prototype, "transactionNumber", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Move.prototype, "amount", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Move.prototype, "moAccountId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Move.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Move.prototype, "unitId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Move.prototype, "projectId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Move.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Move.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => MoAccount_1.default),
    __metadata("design:type", Object)
], Move.prototype, "moAccount", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Move.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Unit_1.default),
    __metadata("design:type", Object)
], Move.prototype, "unit", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], Move.prototype, "project", void 0);
exports.default = Move;
//# sourceMappingURL=Move.js.map