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

describe('getAllItemsWithUserInfo', () => {
  expect.assertions(5)
  it('should return items along with the users info', async () => {
    expect.assertions(5)
    const items = await db.getAllItemsWithUserInfo(testDb)
    expect(items).toHaveLength(14)
    expect(items[0]).toHaveProperty('itemsId')
    expect(items[1]).toHaveProperty('userId')
    expect(items[1].itemsId).toBe(2)
    expect(items[2].userId).toBe(2)
  })
})

describe('getItemsByUserId', () => {
  expect.assertions(3)
  it('returns an array of items for a given user', async () => {
    const userItems = await db.getItemsByUserId(1, testDb)
    expect(userItems).toHaveLength(2)
    expect(userItems[0].userId).toBe(1)
    expect(userItems[0].itemName).toBe('Hummus')
  })
})

describe('getItemByIdWithUserInfo', () => {
  expect.assertions(4)
  it('returns item with the user info', async () => {
    const item = await db.getItemByIdWithUserInfo(2, testDb)
    expect(item.itemName).toBe('Scones')
    expect(item.allergens).toContain('eggs')
    expect(item.availability).toBe('Yes')
    expect(item).toHaveProperty('expiry')
  })
})

describe('getItemById', () => {
  expect.assertions(4)
  it('should get the item by the item id', () => {
    return db.getItemById('1', testDb).then((item) => {
      expect(item).toBeDefined
      expect(item).toHaveProperty('auth0Id')
      expect(item.allergens).toContain('nuts')
      expect(item.itemName).toBe('Hummus')
    })
  })
})

describe('addNewItem', () => {
  expect.assertions(1)
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
      auth0Id: 'auth0|2',
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
})

describe('updateItem', () => {
  it("updates an item's details", async () => {
    expect.assertions(5)
    const item = await db.getItemById(1, testDb)

    const updatedItem = {
      itemName: 'Joloponos',
      allergens: 'SPICEYYY',
      description: 'Spicy Joloponos yuck yuck',
      availability: 'No',
      imageUrl: 'http://localhost:4321',
    }

    return db.updateItem(1, updatedItem, testDb).then((newItem) => {
      expect(item).not.toEqual(updatedItem)
      expect(item.allergens).not.toEqual(newItem)
      expect(item.auth0Id).toEqual(newItem.auth0Id)
      expect(newItem.itemName).toContain('Joloponos')
      expect(newItem.itemName).toEqual(updatedItem.itemName)
    })
  })
})
