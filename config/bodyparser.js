"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParserConfig = {
    whitelistedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    json: {
        encoding: 'utf-8',
        limit: '1mb',
        strict: true,
        types: [
            'application/json',
            'application/json-patch+json',
            'application/vnd.api+json',
            'application/csp-report',
        ],
    },
    form: {
        encoding: 'utf-8',
        limit: '1mb',
        queryString: {},
        types: [
            'application/x-www-form-urlencoded',
        ],
        convertEmptyStringsToNull: true
    },
    raw: {
        encoding: 'utf-8',
        limit: '1mb',
        queryString: {},
        types: [
            'text/*',
        ],
    },
    multipart: {
        autoProcess: true,
        processManually: [],
        encoding: 'utf-8',
        maxFields: 1000,
        limit: '150mb',
        types: [
            'multipart/form-data',
        ],
        convertEmptyStringsToNull: true
    },
};
exports.default = bodyParserConfig;
//# sourceMappingURL=bodyparser.js.map