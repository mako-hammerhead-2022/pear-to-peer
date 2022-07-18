const knex = require('knex')
const testConfig = require('../knexfile').test
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

    expect(users).toHaveLength(12)
    expect(users[0].name).toBe('Harry Horatio')
    expect(users[1].username).toBe('SlipsAllDay')
    expect(users[2].email).toBe('clippityclap_3@example.com')
  })
  // it("should return status 500 and error when database doesn't work", async () => {
  //   expect.assertions(2)
  //   db.getAllUsers.mockImplementation(() =>
  //     Promise.reject(new Error('Something went wrong'))
  //   )
  //   const res = await request(server).get('/api/users')
  //   expect(res.status).toBe(500)
  //   expect(res.text).toContain('Something went wrong')
  // })
})

describe('getUserByAuth0Id', () => {
  it('returns a user using their auth0Id', async () => {
    const user = await db.getUserByAuth0Id('auth0|3', testDb)

    expect(user.username).toBe('E-clips-E')
    expect(user.postcode).toBe(5012)
    expect(user).toHaveProperty('id')
  })
})

describe('createUser', () => {
  it.skip('should add a user', async () => {
    const dbNewUser = {
      id: 9,
      auth0Id: '54321george',
      name: 'Curious George',
      username: 'curiosityFTW',
      email: 'whatIsThat@example.com',
      postcode: 5019,
    }

    const newUser = await db.createUser(dbNewUser, testDb)

    expect(newUser.auth0Id).toBe('54321george')
    expect(newUser.postcode).toBeGreaterThanOrEqual(110)
    expect(newUser.postcode).toBeLessThan(9999)
  })
})
