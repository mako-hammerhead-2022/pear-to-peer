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

// //name location allergens posted expiry description availability
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

// itemName: items.itemName,
// allergens: items.allergens,
// description: items.description,
// dateCreated: items.dateCreated,
// expiry: items.expiry,
// availability: items.availability,
// getItemsWithUserDetails()

module.exports = {
  getAllItems,
  getItemsByUserId,
  insertItem,
}
