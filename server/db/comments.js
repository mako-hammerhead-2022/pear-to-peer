const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

async function getCommentsByItemIdWithAuthor(itemId, db = connection) {
  try {
    const comments = await db('comments')
      .join('users', 'comments.auth0Id', 'users.auth0Id')
      .select(
        'comments.id as commentId',
        'users.id as authorId',
        'itemId',
        'username as authorName',
        'comment',
        'comments.createdAt as timestamp'
      )
      .where({ itemId })
    return comments
  } catch (err) {
    console.error(err)
  }
}

// newComment: authorId, itemId, comment
async function addComment(newComment, db = connection) {
  const toAdd = {
    auth0Id: newComment.auth0Id,
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
async function getCommentByIdWithAuthor(id, db = connection) {
  const comment = await db('comments')
    .join('users', 'comments.auth0Id', 'users.auth0Id')
    .select(
      'comments.id as commentId',
      'users.id as authorId',
      'itemId',
      'username as authorName',
      'comment',
      'comments.createdAt as timestamp'
    )
    .where('commentId', id)
    .first()
  return comment
}
