import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
const db = require('../../db/items')

vi.spyOn(db, 'getAllItemsWithUserInfo')
vi.spyOn(db, 'getItemsByUserId')
vi.spyOn(db, 'getItemByIdWithUserInfo')
vi.spyOn(db, 'insertItem')

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
    expect.assertions(3)
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
    expect.assertions(2)
    db.getAllItemsWithUserInfo.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    const res = await request(server).get('/api/items')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
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
    expect.assertions(2)
    db.getItemsByUserId.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    const res = await request(server).get('/api/items')
    expect(res.status).toBe(500)
    expect(res.text).toContain('Something went wrong')
  })
})

describe('POST /api/items/', () => {
  it.skip('adds a new item from the user', async () => {
    const newItem = {
      itemName: 'testItem',
      allergens: 'testAllergen',
      description: 'testDescription',
      imageUrl: 'testURL.co.nz',
      expiry: 7,
      availability: 'yes',
      userId: 2,
    }
    db.insertItem.mockImplementation(Promise.resolve(newItem))

    await request(server).post('/api/items').send(newItem)
    expect(db.insertItem).toHaveBeenCalledWith(newItem)
  })
})

describe('GET /api/items/:id', () => {
  it('gets an item for a given id', async () => {
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
