const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getCommentsByItemIdWithAuthor(itemId, db = connection) {
  return db('comments')
    .join('users', 'comments.authorId', 'users.id')
    .select(
      'comments.id as commentId',
      'authorId',
      'itemId',
      'name as authorName',
      'comment',
      'comments.createdAt as timestamp'
    )
    .where({ itemId })
}

module.exports = {
  getCommentsByItemIdWithAuthor,
}
