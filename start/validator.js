"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
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
const RULE_NAME = 'shouldNullWhen';
const OPERATORS = {
    'in': {
        compile(comparisonValues) {
            if (!Array.isArray(comparisonValues)) {
                throw new Error(`"${RULE_NAME}": "in" operator expects an array of "comparisonValues"`);
            }
        },
        passes: (value, comparisonValues) => {
            return comparisonValues.includes(value);
        },
    },
    'notIn': {
        compile(comparisonValues) {
            if (!Array.isArray(comparisonValues)) {
                throw new Error(`"${RULE_NAME}": "notIn" operator expects an array of "comparisonValues"`);
            }
        },
        passes: (value, comparisonValues) => {
            return !comparisonValues.includes(value);
        },
    },
    '=': {
        passes: (value, comparisonValue) => {
            return value === comparisonValue;
        },
    },
    '!=': {
        passes: (value, comparisonValue) => {
            return value !== comparisonValue;
        },
    },
    '>': {
        compile(comparisonValue) {
            if (typeof comparisonValue !== 'number') {
                throw new Error(`"${RULE_NAME}": ">" operator expects "comparisonValue" to be a number`);
            }
        },
        passes: (value, comparisonValue) => {
            return value > comparisonValue;
        },
    },
    '<': {
        compile(comparisonValue) {
            if (typeof comparisonValue !== 'number') {
                throw new Error(`"${RULE_NAME}": "<" operator expects "comparisonValue" to be a number`);
            }
        },
        passes: (value, comparisonValue) => {
            return value < comparisonValue;
        },
    },
    '>=': {
        compile(comparisonValue) {
            if (typeof comparisonValue !== 'number') {
                throw new Error(`"${RULE_NAME}": ">=" operator expects "comparisonValue" to be a number`);
            }
        },
        passes: (value, comparisonValue) => {
            return value >= comparisonValue;
        },
    },
    '<=': {
        compile(comparisonValue) {
            if (typeof comparisonValue !== 'number') {
                throw new Error(`"${RULE_NAME}": "<=" operator expects "comparisonValue" to be a number`);
            }
        },
        passes: (value, comparisonValue) => {
            return value <= comparisonValue;
        },
    },
};
Validator_1.validator.rule('shouldNullWhen', (value, compiledOptions, options) => {
    let comparisonValues;
    if (compiledOptions.ref) {
        comparisonValues = options.refs[compiledOptions.ref].value;
    }
    else {
        comparisonValues = compiledOptions.comparisonValues;
    }
    const shouldNullWhen = OPERATORS[compiledOptions.operator].passes(Validator_1.validator.helpers.getFieldValue(compiledOptions.field, options.root, options.tip), comparisonValues);
    if (shouldNullWhen && Validator_1.validator.helpers.exists(value)) {
        options.errorReporter.report(options.pointer, 'shouldNullWhen', 'shouldNullWhen validation failed', options.arrayExpressionPointer, { operator: compiledOptions.operator,
            otherField: compiledOptions.field,
            values: comparisonValues
        });
    }
}, ([field, operator, comparisonValues]) => {
    if (!field || !operator || comparisonValues === undefined) {
        throw new Error(`"${RULE_NAME}": expects a "field", "operator" and "comparisonValue"`);
    }
    if (!OPERATORS[operator]) {
        throw new Error(`"${RULE_NAME}": expects "operator" to be one of the allowed values`);
    }
    if (Validator_1.validator.helpers.isRef(comparisonValues)) {
        return {
            allowUndefineds: true,
            compiledOptions: {
                operator,
                field,
                ref: comparisonValues.key,
            },
        };
    }
    if (typeof OPERATORS[operator].compile === 'function') {
        OPERATORS[operator].compile(comparisonValues);
    }
    return {
        allowUndefineds: true,
        compiledOptions: {
            operator,
            field,
            comparisonValues,
        },
    };
});
//# sourceMappingURL=validator.js.map