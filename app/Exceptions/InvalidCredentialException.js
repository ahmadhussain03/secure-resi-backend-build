"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@poppinss/utils");
class InvalidCredentialException extends utils_1.Exception {
    constructor() {
        super('Invalid user credentials', 400);
    }
    async handle(error, { response }) {
        response
            .status(error.status)
            .json({
            errors: [
                { message: error.message }
            ]
        });
    }
}
exports.default = InvalidCredentialException;
//# sourceMappingURL=InvalidCredentialException.js.map