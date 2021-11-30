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
const Country_1 = __importDefault(require("./Country"));
const State_1 = __importDefault(require("./State"));
const City_1 = __importDefault(require("./City"));
class Profile extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "mobileNo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Profile.prototype, "country", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Profile.prototype, "countryId", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Profile.prototype, "state", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Profile.prototype, "stateId", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Profile.prototype, "city", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Profile.prototype, "cityId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "postCode", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "address", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "additionalInformation", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Profile.prototype, "userId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Profile.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Profile.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Country_1.default, {
        serializeAs: 'country'
    }),
    __metadata("design:type", Object)
], Profile.prototype, "countryRelation", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => State_1.default, {
        serializeAs: 'state'
    }),
    __metadata("design:type", Object)
], Profile.prototype, "stateRelation", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => City_1.default, {
        serializeAs: 'city'
    }),
    __metadata("design:type", Object)
], Profile.prototype, "cityRelation", void 0);
exports.default = Profile;
//# sourceMappingURL=Profile.js.map