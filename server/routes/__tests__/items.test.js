import { vi } from 'vitest'

const request = require('supertest')
const server = require('../../server')
const db = require('../../db/items')
// db object with methods
// a collection of exported functions
// vi.mock('../../db', () => ({
//   getAllItems: vi
//     .fn()
//     .mockReturnValue(Promise.resolve(JSON.stringify([1, 2, 3]))),
// }))

vi.spyOn(db, 'getAllItems')
vi.spyOn(db, 'getItemsByUserId')

afterAll(() => {
  vi.restoreAllMocks()
})

describe('GET /api/items', () => {
  it('does something', async () => {
    console.log(db)
    // const fakeGetAllItems = vi
    //   .fn()
    //   .mockReturnValue(Promise.resolve(new Array(10)))
    db.getAllItems.mockReturnValue(
      Promise.resolve([{ id: 1 }, { id: 2 }, { id: 'bananas' }])
    )

    //console.log('fake', await getAllItems())

    const res = await request(server).get('/api/items')

    console.log(res.body)

    expect(res.status).toBe(200)
  })
})
