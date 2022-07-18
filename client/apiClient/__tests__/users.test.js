import nock from 'nock'

import { addUser, getUserByAuth0Id } from '../users'

// ADD A USER

describe('POST /api/users', () => {
  expect.assertions(5)
  test.skip('inserts a new user', async () => {
    const newUser = {
      auth0Id: 'auth0|4',
      name: 'Perry Platipus',
      username: 'PTP123',
      email: 'ptp123@doofenshmirtz.com',
      postcode: 6011,
    }

    const resUser = {
      id: 13,
      auth0Id: 'auth0|4',
      name: 'Perry Platipus',
      username: 'PTP123',
      email: 'ptp123@doofenshmirtz.com',
      postcode: 6011,
    }

    const scope = nock('http://localhost')
      .post('/api/users', newUser)
      .reply(201, resUser)

    const token = 'auth0|something'

    const userRes = await addUser(newUser, token)

    expect(userRes).toEqual({ newUser })
    expect(userRes.id).toBe(13)
    expect(userRes.auth0Id).toContain('auth0|4')
    expect(userRes.name).toContain('Perry Platipus')
    expect(userRes.postcode).toBe(6011)
    scope.done()
  })
})

// GET USER BY AUTH ID

describe("GET user by the user's auth Id", () => {
  expect.assertions(4)
  test.skip("gets a user by the user's auth Id", async () => {
    const testUser = {
      id: 13,
      auth0Id: 'auth0|4',
      name: 'Perry Platipus',
      username: 'PTP123',
      email: 'ptp123@doofenshmirtz.com',
      postcode: 6011,
    }

    const authId = testUser.auth0Id

    const scope = nock('http://localhost')
      .get(`/api/users/${authId}`)
      .reply(200, testUser)

    const userRes = await getUserByAuth0Id(authId)
    expect(userRes.id).toBe(13)
    expect(userRes.name).toContain('Perry Platipus')
    expect(userRes.username).toContain('PTP123')
    expect(userRes.email).toContain('ptp123@doofenshmirtz.com')
    scope.done()
  })
})
