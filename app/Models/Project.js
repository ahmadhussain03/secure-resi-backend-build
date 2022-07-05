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
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Country_1 = __importDefault(require("./Country"));
const State_1 = __importDefault(require("./State"));
const City_1 = __importDefault(require("./City"));
class Project extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "code", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "noOfCheckpoints", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "noOfGuards", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "noOfMembers", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "noOfProjectStaff", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Project.prototype, "country", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Project.prototype, "state", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Project.prototype, "city", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "cityId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "stateId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "countryId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "postCode", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "address", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "contactPersonName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "contactPersonEmail", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "contactPersonDesignation", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "contactPersonFax", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "latitude", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "longitude", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "geofenceRadius", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "geocode", void 0);
__decorate([
    (0, Orm_1.column)({ serialize: (value) => value ? `http://${Env_1.default.get('IMAGE_HOST')}/api/client/uploads/project/${value}` : null }),
    __metadata("design:type", String)
], Project.prototype, "logo", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Project.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Project.prototype, "user", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Project.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Project.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Country_1.default, {
        serializeAs: 'country'
    }),
    __metadata("design:type", Object)
], Project.prototype, "countryRelation", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => State_1.default, {
        serializeAs: 'state'
    }),
    __metadata("design:type", Object)
], Project.prototype, "stateRelation", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => City_1.default, {
        serializeAs: 'city'
    }),
    __metadata("design:type", Object)
], Project.prototype, "cityRelation", void 0);
exports.default = Project;
//# sourceMappingURL=Project.js.map