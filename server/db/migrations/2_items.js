/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary()
    table.string('itemName').notNullable()
    table.string('allergens').notNullable()
    table.string('description')
    table.string('imageUrl')
    table.timestamps(true, true, true)
    table.date('expiry')
    table.enu('availability', ['Yes', 'No'])
    table.integer('userId').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('items')
}
