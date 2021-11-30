"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    uiEnabled: true,
    uiUrl: 'docs',
    specEnabled: true,
    specUrl: '/swagger.json',
    middleware: [],
    options: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Secure Resi API Documentation',
                version: '1.0.0',
                description: 'Backend Service for secure resi built with AdonisJS',
            },
            servers: [
                {
                    url: `{scheme}://${process.env.NODE_ENV === 'production' ? '103.215.139.76' : 'localhost:3333'}`,
                    variables: {
                        scheme: {
                            enum: [
                                "http"
                            ],
                            default: "http"
                        }
                    }
                }
            ],
        },
        apis: [
            'app/**/*.ts',
            'docs/swagger/**/*.yml',
            'start/routes.ts'
        ],
        basePath: '/'
    },
    mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
    specFilePath: 'docs/swagger.json'
};
//# sourceMappingURL=swagger.js.map