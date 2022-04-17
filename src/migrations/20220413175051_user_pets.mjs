export function up(knex) {
    return knex.schema.createTable('user_pets', function (table) {
        table.increments('id').primary();
        table.string('userid').references('id').inTable('users_2').notNull();
        table.string('petid').references('id').inTable('pets').notNull();
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('user_pets');
  }
