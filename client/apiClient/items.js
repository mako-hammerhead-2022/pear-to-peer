import request from 'superagent'

export function getAllItems() {
  return request.get('/api/items').then((res) => res.body)
}
