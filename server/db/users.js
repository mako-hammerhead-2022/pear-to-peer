const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

// for possible admin feature
const getAllUsers = (db = connection) => db('users').select()

async function createUser(user, db = connection) {
  await db('users').insert(user)
  return getUserByAuth0Id(user.auth0Id, db)
}

function getUserByAuth0Id(auth0Id, db = connection) {
  return db('users').select().where('auth0Id', auth0Id).first()
}

function updateUserByAuth0Id(auth0Id, db = connection) {
  return db('users').update()
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByAuth0Id,
}
