"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.table('posts', function (table) {
        table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });
};
exports.down = function (knex) {
    return knex.schema.table('posts', function (table) {
        table.dropColumn('userId');
    });
};
