import request from 'superagent'

export function getAllUsers() {
  return request.get('/api/users').then((res) => res.body)
}

export function addUser(user) {
  return request.post(`/api/users/`).send(user).catch(logError, 'whoopsie')
}

function logError(err) {
  if (err.message === 'Forbidden') {
    //   throw new Error(
    //     'Only the user who added the fruit may update and delete it'
    //   )
    // } else {
    // eslint-disable-next-line no-console
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
