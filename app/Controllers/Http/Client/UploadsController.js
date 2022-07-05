"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
class UploadsController {
    async index({ request, response }) {
        const location = request.param('*').join('/');
        const { size } = await Drive_1.default.getStats(location);
        response.type((0, path_1.extname)(location));
        response.header('content-length', size);
        return response.stream(await Drive_1.default.getStream(location));
    }
}
exports.default = UploadsController;
//# sourceMappingURL=UploadsController.js.map