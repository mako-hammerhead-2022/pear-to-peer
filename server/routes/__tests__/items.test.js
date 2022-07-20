import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
const db = require('../../db/items')

vi.spyOn(db, 'getAllItemsWithUserInfo')
vi.spyOn(db, 'getItemsByUserId')
vi.spyOn(db, 'getItemByIdWithUserInfo')
vi.spyOn(db, 'insertItem')
vi.spyOn(db, 'updateItem')

beforeAll(() => {
  vi.spyOn(console, 'error')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error.mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  vi.restoreAllMocks()
})

describe('GET /api/items', () => {
  it('returns an array of items', async () => {
    db.getAllItemsWithUserInfo.mockReturnValue(
      Promise.resolve([
        { id: 1, itemName: 'Hummus' },
        { id: 2, itemName: 'Scones' },
        { id: 3, itemName: 'Chicken Empanadas' },
      ])
    )

    const res = await request(server).get('/api/items')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
    expect(res.body[1].itemName).toBe('Scones')
  })
  it("should return status 500 and error when database doesn't work", async () => {
    db.getAllItemsWithUserInfo.mockImplementation(() => {
      throw new Error()
    })
    const res = await request(server).get('/api/items')
    expect(res.status).toBe(500)
  })
})

describe('GET /api/items/byUser/:id', () => {
  it('returns items from the user', async () => {
    expect.assertions(3)
    db.getItemsByUserId.mockReturnValue(
      Promise.resolve([{ userId: 1, itemsId: 1, itemName: 'Hummus' }])
    )

    const res = await request(server).get('/api/items/byUser/1')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].userId).toBe(1)
  })
  it("should return status 500 and error when database doesn't work", async () => {
    db.getItemsByUserId.mockImplementation(() => {
      throw new Error()
    })
    const res = await request(server).get('/api/items/byUser/1')
    expect(res.status).toBe(500)
  })
})

describe('POST /api/items/', () => {
  const newItem = {
    itemName: 'testItem',
    allergens: 'testAllergen',
    description: 'testDescription',
    imageUrl: 'testURL.co.nz',
    expiry: 7,
    availability: 'yes',
    userId: 2,
  }
  it('adds a new item from the user and returns the new object', async () => {
    db.insertItem.mockReturnValue(Promise.resolve(newItem))

    const res = await request(server).post('/api/items').send(newItem)
    expect(res.body).toEqual(newItem)
  })
  it('returns a 500 status on db error', async () => {
    db.insertItem.mockImplementation(() => {
      throw new Error()
    })
    const res = await request(server).post('/api/items').send(newItem)
    expect(res.status).toBe(500)
  })
})

describe('GET /api/items/:id', () => {
  it('gets an item for a given id', async () => {
    db.getItemByIdWithUserInfo.mockReturnValue(Promise.resolve(testItem))
    const res = await request(server).get('/api/items/2')
    expect(res.body).toEqual(testItem)
  })
  it('returns a 500 status on db error', async () => {
    db.getItemByIdWithUserInfo.mockImplementation(() => {
      throw new Error()
    })
    const res = await request(server).get('/api/items/1')
    expect(res.status).toBe(500)
  })
})

describe('PATCH /api/items/update/:id', () => {
  const updated = { ...testItem, description: 'buttered' }
  it('returns a patched item', async () => {
    db.getItemByIdWithUserInfo.mockReturnValue(Promise.resolve(testItem))
    db.updateItem.mockReturnValue(Promise.resolve(updated))

    const res = await request(server).patch('/api/items/update/2').send(updated)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(updated)
  })
  it("returns a 401 error if a user trys to patch an item that isn't theirs", async () => {
    const notLegitPatched = { ...testItem, auth0Id: 'junk' }
    db.getItemByIdWithUserInfo.mockReturnValue(Promise.resolve(notLegitPatched))
    const res = await request(server)
      .patch('/api/items/update/2')
      .send(testItem)
    expect(res.status).toBe(401)
    expect(res.text).toContain('not authorized')
  })
  it('returns a 500 status on db error', async () => {
    db.getItemByIdWithUserInfo.mockImplementation(() => {
      throw new Error()
    })
    const res = await request(server).patch('/api/items/update/2').send(updated)
    expect(res.status).toBe(500)
  })
})

const testItem = {
  itemsId: 2,
  userId: 2,
  username: 'Slippers',
  postcode: 5015,
  itemName: 'toast',
  allergens: 'bread',
  description: 'golden brown',
  imageUrl: 'image.jpg',
  expiry: '2022-07-18 06:58:14',
  availability: 'Yes',
  createdAt: '2022-07-19 03:00:36',
}
