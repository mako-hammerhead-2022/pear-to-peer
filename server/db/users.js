const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

// for possible admin feature
const getAllUsers = (db = connection) => db('users').select()

function createUser(user, db = connection) {
  return db('users').insert(user)
}

function getUserByAuth0Id(auth0Id, db = connection) {
  return db('users').select().where('auth0Id', auth0Id).first()
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByAuth0Id,
}
