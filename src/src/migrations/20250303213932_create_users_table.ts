import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("full_name").notNullable();
    table.string("email").notNullable().unique();
    table.timestamps(true, true); 
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists("users");
};
