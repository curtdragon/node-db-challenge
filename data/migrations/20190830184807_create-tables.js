
exports.up = function(knex) {
    return knex.schema
    .createTable("projects", table => {
        table.increments();
        table.string("name")
            .notNullable()
            .unique();
        table.string("description");
        table.boolean("completed")
            .notNullable()
            .defaultTo(false);
    })

    .createTable("resources", table => {
        table.increments();
        table.string("name")
            .unique()
            .notNullable();
        table.string("description");
    })

    .createTable("tasks", table => {
        table.increments();
        table.string("description")
            .notNullable();
        table.string("notes")
        table.boolean("completed")
            .notNullable()
            .defaultTo(false);
        table.integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
    
    .createTable("project_tasks", table => {
        table.integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.integer("task_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tasks")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("project_tasks")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects")  
};
