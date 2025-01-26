/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'daily_service_selection'

exports.up = (knex) => {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary()
        table.date('date').notNullable()
        table.integer('created_user_id').unsigned().notNullable().defaultTo(0)
        table.integer('updated_user_id').unsigned().notNullable().defaultTo(0)
        table.timestamps(true, true)
        table.datetime('deleted_at').nullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists(tableName)
}
