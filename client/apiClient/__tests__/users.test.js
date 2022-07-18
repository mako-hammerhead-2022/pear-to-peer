import nock from 'nock'

import { addUser, getUserByAuth0Id } from '../users'

// ADD A USER

describe('POST /api/users', () => {
  // expect.assertions(5)
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
    console.log('THIS IS USER RES: ', userRes)
    expect(userRes.content).toBe(newUser.content)

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
