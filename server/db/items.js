const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getAllItemsWithUserInfo(db = connection) {
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
      'expiry',
      'availability'
    )
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
      'expiry',
      'availability'
    )
    .where('users.id', userId)
}

function getItemByIdWithUserInfo(itemId, db = connection) {
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
      'expiry',
      'availability'
    )
    .where('items.id', itemId)
    .first()
}

//helper
function getItemById(id, db = connection) {
  return db('items').select().where({ id }).first()
}

async function insertItem(items, db = connection) {
  const now = new Date()
  now.setDate(now.getDate() + Number(items.expiry))
  const newItem = {
    itemName: items.itemName,
    allergens: items.allergens,
    description: items.description,
    expiry: now,
    availability: items.availability,
    userId: items.userId,
    imageUrl: items.imageUrl,
  }
  const newIds = await db('items').insert(newItem)

  return getItemById(newIds[0], db)
}

// async function updateItem(updatedItem, db = connection) {
//   await db('items')
//     .update({ availability: updatedItem.availability })
//     .where('id', updatedItem.itemsId)

//   return getItemById(updatedItem.itemsId, db)
// }

//JV remove commented out code

async function updateItem(id, updatedItem, db = connection) {
  const itemToUpdate = {
    itemName: updatedItem.itemName,
    allergens: updatedItem.allergens,
    description: updatedItem.description,
    availability: updatedItem.availability,
    userId: updatedItem.userId,
    imageUrl: updatedItem.imageUrl,
  }
  await db('items').update(itemToUpdate).where('id', id)

  return getItemById(id, db)
}

function deleteItem(id, db = connection) {
  return db('items').del().where({ id })
}

module.exports = {
  getItemsByUserId,
  insertItem,
  updateItem,
  deleteItem,
  getAllItemsWithUserInfo,
  getItemByIdWithUserInfo,
}
