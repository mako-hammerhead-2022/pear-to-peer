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
  console.log('insertedItem is', items)
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
  console.log('items is', items, id)
  const updatedItem = {
    itemName: items.itemName,
    allergens: items.allergens,
    description: items.description,
    dateCreated: items.dateCreated,
    expiry: items.expiry,
    availability: items.availability,
  }
  console.log('item updated is', updatedItem)
  return db('items').update(updatedItem).where('id', id)
}

// getItemsWithUserDetails()

module.exports = {
  getAllItems,
  getItemsByUserId,
  insertItem,
  updateItem,
}
