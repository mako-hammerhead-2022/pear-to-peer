import request from 'superagent'

export function getCommentsByItemId(itemId) {
  return request.get(`/api/comments/${itemId}`).then((res) => res.body)
}

export function addComment(newComment, token) {
  return request
    .post('/api/comments')
    .set('authorization', `Bearer ${token}`)
    .send(newComment)
    .then((res) => res.body)
}
