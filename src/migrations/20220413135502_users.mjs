export function up(knex) {
    return knex.schema.createTable('users', function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string('first_name').notNull();
      table.string('last_name').notNull();
      table.string('phone').notNull();
      table.string('password').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('users');
  }
  