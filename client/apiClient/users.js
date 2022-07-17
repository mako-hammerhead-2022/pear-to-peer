import request from 'superagent'

export function addUser(user) {
  return request
    .post(`/api/users/`)
    .send(user)
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
