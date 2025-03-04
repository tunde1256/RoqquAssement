
exports.up = function (knex: import('knex').Knex) {
    return knex.schema
      .dropTableIfExists('posts') 
      .createTable('posts', (table) => {
        table.increments('id').primary(); 
        table.string('title').notNullable(); 
        table.string('body').notNullable(); 
        table.integer('userId').unsigned().notNullable(); 
        table.foreign('userId').references('id').inTable('users'); 
      });
  };
  
  exports.down = function (knex: import('knex').Knex) {
    return knex.schema
      .dropTableIfExists('posts'); 
  };
  