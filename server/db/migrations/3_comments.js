/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary()
    table.integer('authorId').notNullable()
    table.integer('itemId').notNullable()
    table.text('comment').notNullable()
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('comments')
}
