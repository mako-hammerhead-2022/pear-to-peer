const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getAllItems(db = connection) {
  return db('items').select()
}

function getItemsByUserId(userId, db = connection) {
  return db('items')
    .join('users', 'items.userId', 'users.id')
    .select(
      'items.id as itemsId',
      'users.id as userId',
      'username',
      'postcode',
      'itemName',
      'allergens',
      'description',
      'imageUrl',
      'dateCreated',
      'expiry',
      'availability'
    )
    .where('users.id', userId)
}

function insertItem(items, db = connection) {
  const newItem = {
    itemName: items.itemName,
    allergens: items.allergens,
    description: items.description,
    dateCreated: items.dateCreated,
    expiry: items.expiry,
    availability: items.availability,
    userId: items.userId,
  }
  return db('items').insert(newItem)
}

function updateItem(items, id, db = connection) {
  const updatedItem = {
    itemName: items.itemName,
    allergens: items.allergens,
    description: items.description,
    dateCreated: items.dateCreated,
    expiry: items.expiry,
    availability: items.availability,
  }
  return db('items').update(updatedItem).where('id', id)
}

function deleteItem(id, db = connection) {
  return db('items').del().where({ id })
}

module.exports = {
  getAllItems,
  getItemsByUserId,
  insertItem,
  updateItem,
  deleteItem,
}
