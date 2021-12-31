"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
require("./validators/shouldNullWhen");
Validator_1.validator.rule('timezone', (value, _, options) => {
    if (!(new luxon_1.IANAZone(value).isValid)) {
        options.errorReporter.report(options.pointer, 'timezone', 'timezone validation failed', options.arrayExpressionPointer);
    }
}, (_, __, subtype) => {
    if (subtype !== 'string') {
        throw new Error('"timezone" rule can only be used with a string schema type');
    }
    return {
        compiledOptions: {},
    };
});
//# sourceMappingURL=validator.js.map