"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Checkpoint_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Checkpoint"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const fs_1 = __importDefault(require("fs"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
const jimp_1 = __importDefault(require("jimp"));
const qrcode_1 = __importDefault(require("qrcode"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class CheckpointRepository {
    async findByLatLong(latitude, longitude, project) {
        const checkpoint = Database_1.default
            .from('checkpoints')
            .select("*", Database_1.default
            .raw(`
                111.045 * DEGREES(ACOS(COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${longitude})) + SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)))) as distance
            `)).where('project_id', project.id).whereNotNull('latitude').whereNotNull('longitude').whereNotNull('geofence_radius').orderByRaw(Database_1.default.raw(`distance asc`)).whereRaw(`111.045 * DEGREES(ACOS(COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${longitude})) + SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)))) <= geofence_radius`).limit(1);
        return checkpoint;
    }
    async create(data, project) {
        const checkpoint = await Checkpoint_1.default.create(data);
        const projectCode = project.code.length >= 4 ? project.code : project.code.substring(0, 4);
        const checkpointCode = `chk-${projectCode}-${checkpoint.id}`;
        checkpoint.code = checkpointCode;
        await checkpoint.save();
        let dir = './tmp';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        dir = './tmp/qr_code';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        dir = './tmp/qr_code/images';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        const image = await jimp_1.default.read(Application_1.default.makePath('uploads/default/checkpoint.png'));
        const font = await jimp_1.default.loadFont(jimp_1.default.FONT_SANS_32_BLACK);
        image.print(font, 250, 227, checkpointCode);
        const qrBuffer = await qrcode_1.default.toBuffer(checkpointCode);
        const qrJimp = await jimp_1.default.read(qrBuffer);
        qrJimp.resize(415, 415).quality(100);
        image.composite(qrJimp, 607, 57);
        await Drive_1.default.put(`qr_code/${checkpointCode}.jpg`, await image.getBufferAsync(jimp_1.default.MIME_JPEG));
        return checkpoint;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const checkpoints = await Checkpoint_1.default.query().where('project_id', project.id).paginate(page, limit);
        return checkpoints;
    }
    async destroyById(id, project) {
        const checkpoint = await this.findById(id, project);
        await checkpoint.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const checkpoint = await this.findById(id, project);
        checkpoint.status = data.status ? data.status : checkpoint.status;
        checkpoint.name = data.name ? data.name : checkpoint.name;
        checkpoint.nfcCode = data.nfcCode ? data.nfcCode : checkpoint.nfcCode;
        checkpoint.phoneNumber = data.phoneNumber ? data.phoneNumber : checkpoint.phoneNumber;
        checkpoint.note = data.note ? data.note : checkpoint.note;
        checkpoint.latitude = data.latitude ? data.latitude : checkpoint.latitude;
        checkpoint.longitude = data.longitude ? data.longitude : checkpoint.longitude;
        checkpoint.geofenceRadius = data.geofenceRadius ? data.geofenceRadius : checkpoint.geofenceRadius;
        checkpoint.geocode = data.geocode ? data.geocode : checkpoint.geocode;
        checkpoint.notificationAction = data.notificationAction ? data.notificationAction : checkpoint.notificationAction;
        checkpoint.hour = data.hour ? data.hour : checkpoint.hour;
        checkpoint.minute = data.minute ? data.minute : checkpoint.minute;
        checkpoint.reminderDatetime = data.reminderDatetime ? data.reminderDatetime : checkpoint.reminderDatetime;
        checkpoint.subject = data.subject ? data.subject : checkpoint.subject;
        checkpoint.notification = data.notification ? data.notification : checkpoint.notification;
        await checkpoint.save();
        return checkpoint;
    }
    async findById(id, project) {
        const idType = parseInt(id);
        if (isNaN(idType)) {
            const checkpoint = await Checkpoint_1.default.query().where('project_id', project.id).where('code', decodeURI(id)).orWhere('nfc_code', decodeURI(id)).firstOrFail();
            return checkpoint;
        }
        else {
            const checkpoint = await Checkpoint_1.default.query().where('project_id', project.id).where('id', id).orWhere('code', id).orWhere('nfc_code', id).firstOrFail();
            return checkpoint;
        }
    }
}
exports.default = CheckpointRepository;
//# sourceMappingURL=CheckpointRepository.js.map