export function up(knex) {
    return knex.schema.createTable('dietary_restrictions', function (table) {
        table.increments('id').primary();
        table.string('restriction').notNull();
        table.string('petid').references('id').inTable('pets').notNull();
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('dietary_restrictions');
  }