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

describe('getItemsByUsers', () => {
  it('returns an array of items for a given user', async () => {
    const userItems = await db.getItemsByUserId(1, testDb)
    expect(userItems).toHaveLength(1)
    expect(userItems[0].userId).toBe(1)
    expect(userItems[0].itemName).toBe('Hummus')
  })
})

describe('addNewItem', () => {
  it('adds a new item and then returns new item', () => {
    const dbNewItem = {
      itemName: 'Jalapenos',
      allergens: JSON.stringify(['None']),
      description: 'Spicy jalapenos yum yum',
      expiry: 7, // days from creation
      imageUrl: JSON.stringify([
        'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Chicken-Empanada-14.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1599768574&s=e3b5e8fe53c559c704cad71e33d367e5',
      ]),
      availability: 'Yes',
      userId: 2,
    }
    return db.insertItem(dbNewItem, testDb).then((actualItem) => {
      expect(actualItem).toEqual({
        ...dbNewItem,
        expiry: expect.anything(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        id: 4,
      })
    })
  })
})

describe('updateItemAvailability', () => {
  it('updates the availability of an item')
})
