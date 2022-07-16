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

// describe('getAllItems', () => {
//   it('should return an array of all items', async () => {
//     const items = await db.getAllItems(testDb)

//     expect(items).toHaveLength(3)
//     expect(items[0].itemName).toBe('Hummus')
//   })
// })

describe('getAllItemsWithUserInfo', () => {
  it('should return items along with the users info', async () => {
    const items = await db.getAllItemsWithUserInfo(testDb)

    expect(items).toHaveLength(3)
    expect(items[0]).toHaveProperty('itemsId')
    expect(items[1]).toHaveProperty('userId')
    expect(items[1].itemsId).toBe(2)
    expect(items[2].userId).toBe(3)
  })
  it.skip('should return a status of 500 when it doesnt connect to the db', () => {
    db.getAllItemsWithUserInfo.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/items')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
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

// TEST TO GET ITEM BY ID WITH USER INFO
// ATTEMPT TO TEST 1
describe('getItemByIdWithUserInfo', () => {
  it.skip('returns item with the user info', async () => {
    const item = await db.getItemByIdWithUserInfo(2, testDb)
    console.log('This is the item: ', item)
  })
})
// ATTEMPT TO TEST 2
// describe('getItemsByIdWithUserInfo', () => {
//   it('returns item by id with the user info', () => {
//     return db
//       .getItemByIdWithUserInfo(1, testDb)
//       .then(() => {
//         return testDb('items').select().first().where(1, itemId)
//       })
//       .then(() => {
//         expect(username).toBe()
//       })
//   })
// })

describe('getItemById', () => {
  it.skip('returns an item by its id', async () => {
    const items = await db.getItemById(1, testDb)
    console.log('These are the items: ', items)
    expect(items).toHaveLength(1)
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
