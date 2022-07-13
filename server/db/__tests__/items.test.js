const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const db = require('../items')

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getAllItems', () => {
  it('should return an array of all items', async () => {
    const items = await db.getAllItems(testDb)

    expect(items).toHaveLength(3)
    expect(items[0].itemName).toBe('Hummus')
  })
})
