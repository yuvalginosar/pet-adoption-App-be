export function up(knex) {
    return knex.schema.createTable('pets', function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string('type').notNull();
      table.string('name').notNull();
      table.string('adoption_status').notNull();
      table.string('picture');
      table.integer('height').notNull();
      table.integer('weight').notNull();
      table.string('color').notNull();
      table.string('bio');
      table.boolean('hypoallergenic');
      table.string('breed').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  export function down(knex) {
    return knex.schema.dropTable('pets');
  }