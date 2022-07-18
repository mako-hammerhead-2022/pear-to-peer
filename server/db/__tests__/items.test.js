const knex = require('knex')
const request = require('superagent')
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

describe('getAllItemsWithUserInfo', () => {
  it('should return items along with the users info', async () => {
    expect.assertions(5)
    const items = await db.getAllItemsWithUserInfo(testDb)
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveProperty('itemsId')
    expect(items[1]).toHaveProperty('userId')
    expect(items[1].itemsId).toBe(2)
    expect(items[2].userId).toBe(3)
  })
  it.skip("should return status 500 and error when database doesn't work", async () => {
    expect.assertions(2)
    db.getAllItemsWithUserInfo.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    const res = await request(server).get('/api/items')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
  })
})

describe('getItemsByUserId', () => {
  it('returns an array of items for a given user', async () => {
    const userItems = await db.getItemsByUserId(1, testDb)
    expect(userItems).toHaveLength(1)
    expect(userItems[0].userId).toBe(1)
    expect(userItems[0].itemName).toBe('Hummus')
  })
})

describe('getItemByIdWithUserInfo', () => {
  it.skip('returns item with the user info', async () => {
    const item = await db.getItemByIdWithUserInfo(2, testDb)
    console.log('This is the item: ', item)
  })
})

describe('getItemById', () => {
  it.skip('returns an item by its id', async () => {
    const items = await db.getItemById(1, testDb)
    console.log('These are the items: ', items)
    expect(items).toHaveLength(1)
  })
})

describe('addNewItem', () => {
  it('adds a new item and then returns new item', () => {
    expect.assertions(1)
    const dbNewItem = {
      itemName: 'Jalapenos',
      allergens: 'None',
      description: 'Spicy jalapenos yum yum',
      expiry: 7, // days from creation
      imageUrl:
        'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Chicken-Empanada-14.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1599768574&s=e3b5e8fe53c559c704cad71e33d367e5',
      availability: 'Yes',
      userId: 2,
    }
    return db.insertItem(dbNewItem, testDb).then((actualItem) => {
      expect(actualItem).toEqual({
        ...dbNewItem,
        expiry: expect.anything(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        id: 15,
      })
    })
  })
  it.skip('should return status 500 and error when database fails', () => {
    expect.assertions(2)
    db.insertItem(dbNewItem, testDb).mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .post('/api/items')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})

describe('updateItemAvailability', () => {
  it.todo('updates the availability of an item')
})
