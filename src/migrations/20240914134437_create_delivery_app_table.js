/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'delivery_app'

exports.up = (knex) => {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('code').notNullable()
        table.text('logo').nullable()
        table.integer('status').notNullable().defaultTo(1)
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists(tableName)
}
