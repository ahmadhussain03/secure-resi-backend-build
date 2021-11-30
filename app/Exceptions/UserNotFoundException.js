"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@poppinss/utils");
class UserNotFoundException extends utils_1.Exception {
    constructor(msg) {
        super(msg ?? 'User Not Found!', 404);
    }
    async handle(error, { response }) {
        response
            .status(error.status)
            .json({ message: error.message });
    }
}
exports.default = UserNotFoundException;
//# sourceMappingURL=UserNotFoundException.js.map