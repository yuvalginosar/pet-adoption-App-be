export function up(knex) {
  return knex.schema.alterTable('users_2', function (table) {
    table.string('email').notNull();
  });
}
export function down(knex) {
  return knex.schema.dropTable('users_2');
}
