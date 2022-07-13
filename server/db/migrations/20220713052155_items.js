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
    table.string('imageUrl').defaultTo('Please add an image')
    table.date('dateCreated').defaultTo(knex.fn.now())
    table.date('expiry')
    table.string('availability')
    table.string('userId').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('items')
}
