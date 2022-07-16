import request from 'superagent'

export function getCommentsByItemId(itemId) {
  return request
    .get(`/api/comments/${itemId}`)
    .then((res) => ({ id: itemId, comments: res.body }))
}
