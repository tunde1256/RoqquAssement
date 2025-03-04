import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("addresses", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE"); 
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("zip_code").notNullable();
    table.timestamps(true, true); 
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists("addresses");
};
