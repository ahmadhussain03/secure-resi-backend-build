"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@poppinss/utils");
class ModelRelationExistException extends utils_1.Exception {
    constructor(msg) {
        super(msg ?? 'Model Relation Exists!', 400);
    }
    async handle(error, { response }) {
        response
            .status(error.status)
            .json({ message: error.message });
    }
}
exports.default = ModelRelationExistException;
//# sourceMappingURL=ModelRelationExistException.js.map