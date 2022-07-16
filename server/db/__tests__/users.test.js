const knex = require('knex')
const testConfig = require('../knexfile').test
// Ask Mat how this testConfig works :D
const testDb = knex(testConfig)

const db = require('../users')

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getAllUsers', () => {
  it('returns an array of users', async () => {
    expect.assertions(4)
    const users = await db.getAllUsers(testDb)

    expect(users).toHaveLength(3)
    expect(users[0].name).toBe('Harry Horatio')
    expect(users[1].username).toBe('SlipsAllDay')
    expect(users[2].email).toBe('clippityclap_3@example.com')
  })
})

describe('getUserByAuth0Id', () => {
  it('returns a user using their auth0Id', async () => {
    const user = await db.getUserByAuth0Id('ghi789', testDb)
    expect(user.username).toBe('E-clips-E')
    expect(user.postcode).toBe(5012)
    expect(user).toHaveProperty('id')
  })
})

describe('createUser', () => {})
