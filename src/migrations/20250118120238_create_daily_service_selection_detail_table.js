/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'daily_service_selection_detail'

exports.up = (knex) => {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.integer('daily_service_selection_id').unsigned().notNullable()
        table.foreign('daily_service_selection_id')
            .references('id').inTable('daily_service_selection')
            .onDelete('CASCADE')
            .withKeyName('fk_daily_service_selection_id')

        table.integer('service_id').unsigned().notNullable()
        table.foreign('service_id')
            .references('id')
            .inTable('service')
            .onDelete('CASCADE')
            .withKeyName('fk_service_id')

        table.integer('request_id').unsigned().notNullable()
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
