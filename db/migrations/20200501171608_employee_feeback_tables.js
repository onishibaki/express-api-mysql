exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("employees", (table) => {
      table.increments("employee_id");
      table.string("firstName", 20).notNullable();
      table.string("lastName", 20).notNullable();
      table.string("flag", 2).defaultTo(0);
      table.dateTime("created_date").defaultTo(knex.fn.now());
    })
    .createTable("performance", (table) => {
      table.increments("feedback_id");
      table.string("feedback", 255).notNullable();
      table.integer("assign_id", 15).nullable();
      table.integer("employee_id").unsigned().notNullable();
      table.dateTime("created_date").defaultTo(knex.fn.now());
      table
        .foreign("employee_id")
        .references("employee_id")
        .inTable("employees");
    });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("employees").dropTable("performance");
};
