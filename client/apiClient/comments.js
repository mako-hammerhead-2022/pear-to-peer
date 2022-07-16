import request from 'superagent'

export function getCommentsByItemId(itemId) {
  return request
    .get(`/api/comments/${itemId}`)
    .then((res) => ({ id: itemId, comments: res.body }))
}

export function addComment(newComment) {
  return request
    .post('/api/comments')
    .send(newComment)
    .then((res) => res.body)
}
