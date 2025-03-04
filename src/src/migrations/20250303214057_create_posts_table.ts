import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("body").notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE"); 
    table.timestamps(true, true); 
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists("posts");
};
