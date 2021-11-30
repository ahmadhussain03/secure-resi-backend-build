"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const gm_1 = __importDefault(require("gm"));
const image_size_1 = __importDefault(require("image-size"));
class ImagesController {
    async commentImage({ params, response, request }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('comment/image', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async commentAudio({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('comment/audio', params.filename));
    }
    async improvementImage({ request, params, response }) {
        const h = request.qs().h;
        const w = request.qs().w;
        const imgaePath = Application_1.default.tmpPath('improvement/image', params.filename);
        const image = (0, gm_1.default)(imgaePath);
        const size = (0, image_size_1.default)(imgaePath);
        const resizedHeight = h ?? size.height;
        const resizedWidth = w ?? size.width;
        return response.stream(image.resize(resizedWidth, resizedHeight).stream());
    }
    async improvementAudio({ params, response }) {
        return response.attachment(Application_1.default.tmpPath('improvement/audio', params.filename));
    }
}
exports.default = ImagesController;
//# sourceMappingURL=ImagesController.js.map