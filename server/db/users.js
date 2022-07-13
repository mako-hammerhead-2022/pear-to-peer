const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

const getAllUsers = (db = connection) => db('users').select()

function createUser(user, db = connection) {
  return db('users').insert(user)
}

module.exports = {
  getAllUsers,
  createUser,
}
