const usersDb = require('./users')
const itemsDb = require('./items')

module.exports = {
  ...usersDb,
  ...itemsDb,
}
