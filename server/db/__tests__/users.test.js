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
    const users = await db.getAllUsers(testDb)

    expect(users).toHaveLength(3)
    expect(users[0].name).toBe('Harry Horatio')
  })
})
