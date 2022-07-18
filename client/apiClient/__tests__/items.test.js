import nock from 'nock'

import { addItem, getAllItemsWithUserInfo } from '../items'

// GET ALL ITEMS WITH USER INFO
describe('GET /api/items/:userId', () => {
  test.skip('get request for all items with user info', async () => {
    expect.assertions(7)
    const item = {
      id: 3,
      itemName: 'apple',
      allergens: 'apple',
      description: 'juicy and crunchy',
      imageUrl: 'appleImage.co.nz',
      expiry: 'expiryDate',
      availability: 'Yes',
      userId: 3,
    }

    const userId = item.userId

    const scope = nock('http://localhost')
      .get(`/api/items/${userId}`)
      .reply(200, item)

    const itemRes = await getAllItemsWithUserInfo(userId)

    expect(itemRes.itemName).toContain('apple')
    expect(itemRes.allergens).toContain('apple')
    expect(itemRes.description).toContain('juicy and crunchy')
    expect(itemRes.imageUrl).toContain('appleImage.co.nz')
    expect(itemRes.expiry).toContain('expiryDate')
    expect(itemRes.availability).toContain('Yes')
    expect(itemRes.userId).toBe(3)

    scope.done()
  })
})

// ADD ITEM
describe('POST /api/items', () => {
  expect.assertions(1)
  test('post request to api route, adding item', async () => {
    const testItem = {
      id: 3,
      itemName: 'apple',
      allergens: 'apple',
      description: 'juicy and crunchy',
      imageUrl: 'appleImage.co.nz',
      expiry: 'expiryDate',
      availability: 'Yes',
      userId: 3,
    }
    const scope = nock('http://localhost')
      .post('/api/items')
      .reply(200, testItem)
    const token = 'auth0|something'

    const itemRes = await addItem(testItem, token)

    expect(itemRes.content).toBe(testItem.content)
    scope.done()
  })
})

// GET ITEM BY ID
