const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getAllItemsWithUserInfo(db = connection) {
  return db('items')
    .join('users', 'items.auth0Id', 'users.auth0id')
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
      'availability',
      'createdAt'
    )
}

function getItemsByUserId(userId, db = connection) {
  return db('items')
    .join('users', 'items.auth0Id', 'users.auth0Id')
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
      'availability',
      'createdAt'
    )
    .where('users.id', userId)
}

function getItemByIdWithUserInfo(itemId, db = connection) {
  return db('items')
    .join('users', 'items.auth0Id', 'users.auth0Id')
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
      'availability',
      'createdAt',
      'items.auth0Id as auth0Id'
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
    imageUrl: items.imageUrl,
    auth0Id: items.auth0Id,
  }
  const newIds = await db('items').insert(newItem)

  return getItemById(newIds[0], db)
}

async function updateItem(id, updatedItem, db = connection) {
  const itemToUpdate = {
    itemName: updatedItem.itemName,
    allergens: updatedItem.allergens,
    description: updatedItem.description,
    availability: updatedItem.availability,
    imageUrl: updatedItem.imageUrl,
  }
  await db('items').update(itemToUpdate).where('id', id)

  return getItemById(id, db)
}

module.exports = {
  getItemsByUserId,
  insertItem,
  updateItem,
  getAllItemsWithUserInfo,
  getItemByIdWithUserInfo,
  getItemById,
}
