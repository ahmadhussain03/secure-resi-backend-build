"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const gm_1 = __importDefault(require("gm"));
const image_size_1 = __importDefault(require("image-size"));
class ImagesController {
    async patrolEntryImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('patrol_entry/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async patrolScheduleEntryImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('patrol_schedule_entry/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async scheduleEntryImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('schedule_entry/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async logBookImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('log_book/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async guardOperationImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('guard_operation/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async guardItemImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('guard_item/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async staffNotificationImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('satff_notification/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async profileImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const directoryName = params.filename.split(".")[0];
        const imgaePath = Application_1.default.tmpPath(`profile/images/${directoryName}`, params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async emergencyContactImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('emergency_contact/images', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async qrCodeImage({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('qr_code/images', params.filename));
    }
    async patrolEntryAudio({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('patrol_entry/audio', params.filename));
    }
    async patrolScheduleEntryAudio({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('patrol_schedule_entry/audio', params.filename));
    }
    async scheduleEntryAudio({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('schedule_entry/audio', params.filename));
    }
    async logBookAudio({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('log_entry/audio', params.filename));
    }
    async guardOperationAudio({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('guard_operation/audio', params.filename));
    }
}
exports.default = ImagesController;
//# sourceMappingURL=ImagesController.js.map