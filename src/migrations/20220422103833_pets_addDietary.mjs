export function up(knex) {
    return knex.schema.alterTable('pets', function (table) {
      table.string('dietary_restrictions');
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('pets');
  }
  