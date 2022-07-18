import nock from 'nock'

import { addUser, getUserByAuth0Token } from '../users'

// ADD A USER

describe('POST /api/users', () => {
  expect.assertions(3)
  test('inserts a new user', async () => {
    const newUser = {
      auth0Id: 'auth0|4',
      name: 'Perry Platipus',
      username: 'PTP123',
      email: 'ptp123@doofenshmirtz.com',
      postcode: 6011,
    }

    const scope = nock('http://localhost')
      .post('/api/users/')
      .reply(201, newUser)

    const userRes = await addUser(newUser)
    expect(userRes.content).toBe(newUser.content)
    expect(userRes.auth0Id).toContain('auth0|4')
    expect(userRes.name).toContain('Perry Platipus')
    scope.done()
  })
})

// GET USER BY AUTH ID

describe("GET user by the user's auth token", () => {
  expect.assertions(4)
  test("gets a user by the user's auth token", async () => {
    const testUser = {
      id: 13,
      auth0Id: 'auth0|4test',
      name: 'Perry Platipus',
      username: 'PTP123',
      email: 'ptp123@doofenshmirtz.com',
      postcode: 6011,
    }

    const authId = testUser.auth0Id

    const scope = nock('http://localhost')
      .get(`/api/users/`)
      .reply(200, testUser)

    const token = 'auth0|something'

    const userRes = await getUserByAuth0Token(authId, token)
    expect(userRes.id).toBe(13)
    expect(userRes.name).toContain('Perry Platipus')
    expect(userRes.username).toContain('PTP123')
    expect(userRes.email).toContain('ptp123@doofenshmirtz.com')
    scope.done()
  })
})
