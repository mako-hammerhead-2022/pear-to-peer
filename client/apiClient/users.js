import request from 'superagent'

export function addUser(user, token) {
  return request
    .post(`/api/users/`)
    .set('authorization', `Bearer ${token}`)
    .send(user)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}

export function getUserByAuth0Id(token) {
  if (!token) {
    return undefined
  }
  return request
    .get(`/api/users/${token}`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}
