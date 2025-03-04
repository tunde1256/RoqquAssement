import { Knex } from 'knex';

exports.up = function(knex: any) {
    return knex.schema.table('posts', function(table: Knex.TableBuilder) {
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex: Knex) {
    return knex.schema.table('posts', function(table: Knex.TableBuilder) {
      table.dropColumn('userId');
    });
  };
  