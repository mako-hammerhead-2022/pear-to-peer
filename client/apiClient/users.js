import request from 'superagent'

export function addUser(user, token) {
  return request
    .post(`/api/users/`)
    .set('authorization', `Bearer ${token}`)
    .send(user)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}

export function getUserByAuth0Id(auth0Id) {
  if (!auth0Id) {
    return undefined
  }
  return request
    .get(`/api/users/${auth0Id}`)
    .then((res) => res.body)
    .catch((err) => console.error(err))
}
