const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

const getAllUsers = (db = connection) => db('users').select()

module.exports = {
  getAllUsers,
}
