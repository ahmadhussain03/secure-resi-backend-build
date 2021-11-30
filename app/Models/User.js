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
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const ClientStaff_1 = __importDefault(require("./ClientStaff"));
const Profile_1 = __importDefault(require("./Profile"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const Item_1 = __importDefault(require("./Item"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Resident_1 = __importDefault(require("./Resident"));
const FavouriteContactRequest_1 = __importDefault(require("./FavouriteContactRequest"));
const FavouriteContact_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/FavouriteContact"));
const ApiToken_1 = __importDefault(require("./ApiToken"));
class User extends Orm_1.BaseModel {
    static async hashPassword(user) {
        if (user.$dirty.password) {
            user.password = await Hash_1.default.make(user.password);
        }
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, Orm_1.column)({ consume: (value) => UserType_1.UserType[value] }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], User.prototype, "parentId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "rememberMeToken", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "latitude", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "longitude", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "geofenceRadius", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "geocode", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/profile/images/${image}` : null
    }),
    __metadata("design:type", Object)
], User.prototype, "image", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "personId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => ClientStaff_1.default),
    __metadata("design:type", Object)
], User.prototype, "clientStaff", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Profile_1.default),
    __metadata("design:type", Object)
], User.prototype, "profile", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Resident_1.default),
    __metadata("design:type", Object)
], User.prototype, "resident", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Role_1.default),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "deviceToken", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User, {
        foreignKey: 'parent_id'
    }),
    __metadata("design:type", Object)
], User.prototype, "parent", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => ApiToken_1.default),
    __metadata("design:type", Object)
], User.prototype, "apiTokens", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Item_1.default, {
        localKey: 'id',
        relatedKey: 'id',
        pivotTable: 'user_items',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'item_id'
    }),
    __metadata("design:type", Object)
], User.prototype, "items", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => FavouriteContactRequest_1.default, {
        foreignKey: 'favouriteId',
        localKey: 'id',
        serializeAs: 'favourite_requests'
    }),
    __metadata("design:type", Object)
], User.prototype, "favouriteRequests", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => FavouriteContact_1.default, {
        foreignKey: 'favouriteId',
        localKey: 'id',
        serializeAs: 'favourite_conatcts'
    }),
    __metadata("design:type", Object)
], User.prototype, "favouriteContacts", void 0);
__decorate([
    (0, Orm_1.beforeSave)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
exports.default = User;
//# sourceMappingURL=User.js.map