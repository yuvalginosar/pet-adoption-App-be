export function up(knex) {
    return knex.schema.alterTable('users', function (table) {
      table.string('bio');
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('users');
  }

