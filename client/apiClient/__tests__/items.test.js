import nock from 'nock'

import { patchItem } from '../../slices/currentItem'
import {
  addItem,
  getAllItemsByUserId,
  getAllItemsWithUserInfo,
  getImageUrl,
  getItemById,
  updateItem,
} from '../items'

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
describe('GET /api/items/:itemId', () => {
  test('get item by item Id', async () => {
    expect.assertions(8)
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

    const itemId = testItem.itemId

    const scope = nock('http://localhost')
      .get(`/api/items/${itemId}`)
      .reply(200, testItem)

    const itemRes = await getItemById(itemId)

    expect(itemRes.id).toBe(3)
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

// GET ALL ITEMS BY USER ID
describe('GET /api/items/byUser/:userId', () => {
  test('get all items by userId', async () => {
    expect.assertions(5)
    const userItems = [
      {
        id: 3,
        itemName: 'apple',
        allergens: 'apple',
        description: 'juicy and crunchy',
        imageUrl: 'appleImage.co.nz',
        expiry: 'expiryDate',
        availability: 'Yes',
        userId: 3,
      },

      {
        id: 4,
        itemName: 'bananas',
        allergens: 'bananana',
        description: 'yellow and long',
        imageUrl: 'bananaPhoto.co.nz',
        expiry: 'expiryDate',
        availability: 'No',
        userId: 3,
      },
    ]

    const userId = userItems.userId

    const scope = nock('http://localhost')
      .get(`/api/items/byUser/${userId}`)
      .reply(200, userItems)

    const itemsRes = await getAllItemsByUserId(userId)

    expect(itemsRes[0].userId).toBe(3)
    expect(itemsRes[1].userId).toBe(3)
    expect(itemsRes[0].itemName).toContain('apple')
    expect(itemsRes[1].allergens).toContain('banana')
    expect(itemsRes).toHaveLength(2)

    scope.done()
  })
})

// UPDATES ITEM
describe('PATCH /api/items/update/itemId', () => {
  test.skip('updates item by item Id', async () => {
    const item = {
      id: 3,
      itemName: 'apple',
    }

    const itemId = item.id
    const action = updateItem({ id: 3, itemName: 'good apple' })
    const newState = patchItem(item, action)

    const scope = nock('http://localhost')
      .patch(`/api/items/update/${itemId}`)
      .reply(200, newState)

    expect(item[0].itemName).toContain('apple')
    scope.done()
  })
})

// it('updates fruit data', () => {
//   const oldState = [
//     { id: 1, name: 'pear' },
//     { id: 2, name: 'orange' },
//   ]
//   const action = updateFruit({ id: 2, name: 'apple' })
//   const newState = fruits(oldState, action)
//   expect(newState[1].name).toBe('apple')
//   expect(newState[0].name).toBe('pear')
//   expect(newState).toHaveLength(2)
// })

// GET IMAGE URL
describe('GET /api/image', () => {
  const initialFile = {
    name: 'filename',
    type: 'filetype',
  }

  const fileToSend = {
    fileName: 'filename',
    fileType: 'filetype',
  }

  it('should return the image url', async () => {
    expect.assertions(1)
    nock('http://localhost').post('/api/image', fileToSend).reply(201, {
      signedUrl:
        'https://pear-to-peer.s3.ap-southeast-2.amazonaws.com/pears_tree.png?.a-whole-bunch-of-random-stuff',
    })
    nock('https://pear-to-peer.s3.ap-southeast-2.amazonaws.com')
      .put('/pears_tree.png?.a-whole-bunch-of-random-stuff')
      .reply(201)

    const imageUrl = await getImageUrl(initialFile)
    expect(imageUrl).toBe(
      'https://pear-to-peer.s3.ap-southeast-2.amazonaws.com/pears_tree.png'
    )
  })
})
