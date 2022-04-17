export function up(knex) {
    return knex.schema.alterTable('user_pets', function (table) {
        table.timestamp('action_date').defaultTo(knex.fn.now());
        table.string('adoption_status').notNull();

    });
  }
  export function down(knex) {
    return knex.schema.dropTable('user_pets');
  }
