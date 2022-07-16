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
      'username as authorName',
      'comment',
      'comments.createdAt as timestamp'
    )
    .where({ itemId })
}

// newComment: authorId, itemId, comment
async function addComment(newComment, db = connection) {
  const toAdd = {
    authorId: newComment.authorId,
    itemId: newComment.itemId,
    comment: newComment.comment,
  }
  const newIds = await db('comments').insert(toAdd)

  return getCommentByIdWithAuthor(newIds[0], db)
}

module.exports = {
  getCommentsByItemIdWithAuthor,
  addComment,
}

// Helpers
function getCommentByIdWithAuthor(id, db = connection) {
  return db('comments')
    .join('users', 'comments.authorId', 'users.id')
    .select(
      'comments.id as commentId',
      'authorId',
      'itemId',
      'username as authorName',
      'comment',
      'comments.createdAt as timestamp'
    )
    .where({ commentId: id })
    .first()
}
