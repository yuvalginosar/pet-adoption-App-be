export function up(knex) {
    return knex.schema.alterTable('users_2', function (table) {
      table.boolean('is_admin').notNull().defaultTo(0);
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('users_2');
  }