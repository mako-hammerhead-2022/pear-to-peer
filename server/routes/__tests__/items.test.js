import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
require('../../db')

vi.mock('../../db', () => ({
  getAllItems: vi
    .fn()
    .mockReturnValue(Promise.resolve(JSON.stringify([1, 2, 3]))),
}))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('GET /api/items', () => {
  it.skip('does something', async () => {
    // const fakeGetAllItems = vi
    //   .fn()
    //   .mockReturnValue(Promise.resolve(new Array(10)))
    // db.getAllItems.mockImplementation(fakeGetAllItems)

    // http://127.0.0.1:61322/api/items
    //console.log('fake', await getAllItems())

    const res = await request(server).get('/api/items')

    console.log(res.body.message)

    expect(res.status).toBe(200)
  })
})
