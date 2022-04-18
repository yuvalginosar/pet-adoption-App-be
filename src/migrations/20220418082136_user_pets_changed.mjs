export function up(knex) {
    return knex.schema.alterTable('user_pets', function (table) {
      table.renameColumn('adoption_status', 'status')
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('user_pets');
  }