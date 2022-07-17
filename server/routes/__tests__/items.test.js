import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
const db = require('../../db/items')

vi.spyOn(db, 'getAllItemsWithUserInfo')
vi.spyOn(db, 'getItemsByUserId')
vi.spyOn(db, 'insertItem')

beforeAll(() => {
  vi.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
  // checkJwt.mockImplementation((req, res, next) => {
  //   next()
  // })
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
})

describe('GET /api/items/byUser/:id', () => {
  it('returns items from the user', async () => {
    db.getItemsByUserId.mockReturnValue(
      Promise.resolve([{ userId: 1, itemsId: 1, itemName: 'Hummus' }])
    )

    const res = await request(server).get('/api/items/byUser/1')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].userId).toBe(1)
  })
})

describe('POST /api/items/', () => {
  it.skip('adds a new item from the user', async () => {
    const newItem = {
      userId: 2,
      itemName: 'testItem',
      allergens: 'testAllergen',
      description: 'testDescription',
      imageUrl: 'testURL.co.nz',
      expiry: 7,
      availability: 'yes',
    }
    db.insertItem.mockImplementation((newItem) => {})
    // db.insertItem.mockReturnValue(
    //   Promise.resolve([
    //     {
    //       itemsId: 2,
    //       userId: 2,
    //       itemName: 'testItem',
    //       allergens: 'testAllergen',
    //       description: 'testDescription',
    //       imageUrl: 'testURL.co.nz',
    //       dateCreated: '2022-03-10 08:24:03',
    //       expiry: '2022-31-12 00:00:00',
    //       availability: 'yes',
    //     },
    //   ])
    // )

    await request(server).post('/api/items').send(newItem)

    expect(db.insertItem).toHaveBeenCalledWith(newItem)

    // const res = await request(server).get('/api/items/15')

    // console.log(res.text)
    // expect(res.status).toBe(200)
  })
})
