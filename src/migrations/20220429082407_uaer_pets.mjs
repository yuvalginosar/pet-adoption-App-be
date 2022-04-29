export function up(knex) {
    return knex.schema.createTable('user_pets', function (table) {
        table.increments('id').primary();
        table.string('userid').notNull();
        table.string('petid').notNull();
        table.string('status').notNull();
	    table.timestamp('action_date').defaultTo(knex.fn.now());
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('user_pets');
  }
