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
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const User_1 = __importDefault(require("./User"));
const Unit_1 = __importDefault(require("./Unit"));
class Resident extends Orm_1.BaseModel {
    static async createUniqueCode(resident) {
        if (resident.code == null) {
            const code = Math.floor(1000000 + Math.random() * 9000000);
            resident.code = code.toString();
        }
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Resident.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "passport", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "gender", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "phone", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "note", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "nationality", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "race", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "religion", void 0);
__decorate([
    Orm_1.column.date(),
    __metadata("design:type", luxon_1.DateTime)
], Resident.prototype, "dob", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/profile/images/${image}` : null
    }),
    __metadata("design:type", Object)
], Resident.prototype, "idCard", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/profile/images/${image}` : null
    }),
    __metadata("design:type", Object)
], Resident.prototype, "sign", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Resident.prototype, "hasCompany", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "companyName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "companyPhone", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "companyMobile", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "companyEmail", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Resident.prototype, "isApproved", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "type", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], Resident.prototype, "code", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "registrationDocument", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Resident.prototype, "registrationNo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Resident.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Resident.prototype, "projectId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Resident.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Resident.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], Resident.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Resident.prototype, "user", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Unit_1.default, {
        pivotTable: 'resident_units',
        pivotRelatedForeignKey: 'unit_id',
        pivotForeignKey: 'resident_id',
        relatedKey: 'id'
    }),
    __metadata("design:type", Object)
], Resident.prototype, "units", void 0);
__decorate([
    (0, Orm_1.beforeSave)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Resident]),
    __metadata("design:returntype", Promise)
], Resident, "createUniqueCode", null);
exports.default = Resident;
//# sourceMappingURL=Resident.js.map