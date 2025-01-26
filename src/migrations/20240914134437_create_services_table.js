/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'service'

exports.up = (knex) => {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('code').notNullable()
        table.enu('type', ['external', 'internal']).notNullable()
        table.integer('status').unsigned().notNullable().defaultTo(1)
        table.text('logo').nullable()
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
