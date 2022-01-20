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
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
const Unit_1 = __importDefault(require("./Unit"));
const Country_1 = __importDefault(require("./Country"));
const State_1 = __importDefault(require("./State"));
const City_1 = __importDefault(require("./City"));
class Visitor extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Visitor.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "registrationDocument", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "registrationNo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "gender", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "phone", void 0);
__decorate([
    Orm_1.column.date(),
    __metadata("design:type", luxon_1.DateTime)
], Visitor.prototype, "dob", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/resident/upload/profile/images/${image}` : null
    }),
    __metadata("design:type", Object)
], Visitor.prototype, "idCard", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/resident/upload/profile/images/${image}` : null
    }),
    __metadata("design:type", Object)
], Visitor.prototype, "document", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/resident/upload/profile/images/${image}` : null
    }),
    __metadata("design:type", Object)
], Visitor.prototype, "image", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "nationality", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Visitor.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Visitor.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Visitor.prototype, "unitId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Visitor.prototype, "countryId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Visitor.prototype, "stateId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Visitor.prototype, "cityId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "address", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Visitor.prototype, "postCode", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Visitor.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Visitor.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Visitor.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], Visitor.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Unit_1.default),
    __metadata("design:type", Object)
], Visitor.prototype, "unit", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Country_1.default, {
        serializeAs: 'country'
    }),
    __metadata("design:type", Object)
], Visitor.prototype, "country", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => State_1.default, {
        serializeAs: 'state'
    }),
    __metadata("design:type", Object)
], Visitor.prototype, "state", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => City_1.default, {
        serializeAs: 'city'
    }),
    __metadata("design:type", Object)
], Visitor.prototype, "city", void 0);
exports.default = Visitor;
//# sourceMappingURL=Visitor.js.map