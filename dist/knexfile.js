"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './src/migrations',
        },
        seeds: {
            directory: './src/seeds',
        },
    },
};
exports.default = config;
