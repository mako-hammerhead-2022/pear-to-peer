import request from 'superagent'

export function getAllUsers() {
  return request.get('/api/users').then((res) => res.body)
}
