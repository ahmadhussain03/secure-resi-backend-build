"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@poppinss/utils");
class ForbiddenException extends utils_1.Exception {
    constructor() {
        super('Forbidden', 403, 'E_FORBIDDEN_ACCESS');
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
exports.default = ForbiddenException;
//# sourceMappingURL=ForbiddenException.js.map