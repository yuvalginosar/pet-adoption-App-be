export function up(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('email').notNull();
        table.string('first_name').notNull();
        table.string('last_name').notNull();
        table.string('phone').notNull();
        table.string('password').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.boolean('is_admin').notNull().defaultTo(0);

    });
  }
  export function down(knex) {
    return knex.schema.dropTable('users');
  }
