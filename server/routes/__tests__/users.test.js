import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
const db = require('../../db/users')

vi.spyOn(db, 'getUserByAuth0Id')
vi.spyOn(db, 'createUser')

beforeAll(() => {
  vi.spyOn(console, 'error')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error.mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  vi.restoreAllMocks()
})

describe('GET /api/users', () => {
  it("gets a user by the user's auth0 Id", async () => {
    expect.assertions(3)
    db.getUserByAuth0Id.mockReturnValue(
      Promise.resolve([
        {
          id: 24,
          auth0Id: 'auth0|24',
          name: 'Twenty Four',
          username: 'KB8TwentyFour',
          email: 'kb8TwentyFour@example.com',
          postcode: 6024,
        },
      ])
    )

    const res = await request(server).get('/api/users')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe('Twenty Four')
  })
  it("should return status 500 and error when database doesn't work", async () => {
    expect.assertions(2)
    db.getUserByAuth0Id.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    const res = await request(server).get('/api/users')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
  })
})

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    expect.assertions(2)
    const newUser = {
      auth0Id: 'auth0|4',
      email: 'name@example.com',
      name: 'Jerry Picker',
      username: 'JerryPikerz',
      postcode: 5230,
    }
    db.createUser.mockReturnValue(Promise.resolve(newUser))

    const res = await request(server).post('/api/users').send(newUser)
    expect(res.status).toBe(200)
    expect(db.createUser).toHaveBeenCalledTimes(1)
  })
  it("should return status 500 and error when DB doesn't work", async () => {
    expect.assertions(2)
    db.createUser.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    const res = await request(server).post('/api/users')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
  })
})
