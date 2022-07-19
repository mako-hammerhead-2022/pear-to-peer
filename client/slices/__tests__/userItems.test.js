import { vi } from 'vitest'

import { addItem, getAllItemsByUserId } from '@/apiClient/items'
import { patchItem } from '@/slices/currentItem'
import reducer, { fetchItemsByUserId, postNewItem } from '@/slices/userItems'
import store from '@/store'

vi.mock('@/apiClient/items', () => ({
  addItem: vi.fn(),
  getAllItemsByUserId: vi.fn(),
}))

afterEach(() => {
  vi.resetAllMocks()
})

afterAll(() => {
  vi.clearAllMocks()
})

describe('userItems reducer', () => {
  const initialState = []
  it('should have an initial state of an empty array', () => {
    const state = store.getState().userItems
    expect(state).toEqual(initialState)
  })
  describe('fetchItemsByUserId.fulfilled', () => {
    it('should set the state as the payload', () => {
      const previousState = initialState

      expect(
        reducer(previousState, fetchItemsByUserId.fulfilled(testItems))
      ).toEqual(testItems)
    })
  })
  describe('postNewItem.fulfilled', () => {
    it('should append the new item to the previous state', () => {
      const previousState = [testItems[0]]

      expect(
        reducer(previousState, postNewItem.fulfilled(testItems[1]))
      ).toEqual([...testItems])
    })
  })
  describe('patchItem.fulfilled', () => {
    it('should replace the item from the previous state with the updated item', () => {
      const previousState = [...testItems]
      const updatedItem = { ...testItems[0], description: 'very cool', id: 1 }

      expect(reducer(previousState, patchItem.fulfilled(updatedItem))).toEqual([
        updatedItem,
        testItems[1],
      ])
    })
  })
})

describe('userItems thunks', () => {
  describe('fetchItemsByUserId', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'userItems/fetchItems'
      expect(fetchItemsByUserId.typePrefix).toBe(expectedPrefix)
      expect(fetchItemsByUserId.fulfilled.type).toBe(
        `${expectedPrefix}/fulfilled`
      )
      expect(fetchItemsByUserId.pending.type).toBe(`${expectedPrefix}/pending`)
      expect(fetchItemsByUserId.rejected.type).toBe(
        `${expectedPrefix}/rejected`
      )
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemsByUserId(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          meta: expect.objectContaining({
            arg: args,
            requestStatus: 'pending',
          }),
          payload: undefined,
          type: `${fetchItemsByUserId.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemsByUserId(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(getAllItemsByUserId).toHaveBeenNthCalledWith(1, args)
    })
    it('should return data from the API client function as a payload', async () => {
      getAllItemsByUserId.mockReturnValue(testItems)
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemsByUserId(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(testItems)
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      getAllItemsByUserId.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemsByUserId(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
  describe('postNewUser', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'userItems/postNew'
      expect(postNewItem.typePrefix).toBe(expectedPrefix)
      expect(postNewItem.fulfilled.type).toBe(`${expectedPrefix}/fulfilled`)
      expect(postNewItem.pending.type).toBe(`${expectedPrefix}/pending`)
      expect(postNewItem.rejected.type).toBe(`${expectedPrefix}/rejected`)
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = testItems[0]
      const thunkFn = postNewItem(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          meta: expect.objectContaining({
            arg: args,
            requestStatus: 'pending',
          }),
          payload: undefined,
          type: `${postNewItem.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = testItems[0]
      const thunkFn = postNewItem(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(addItem).toHaveBeenNthCalledWith(1, args.user, args.token)
    })
    it('should return data from the API client function as a payload', async () => {
      addItem.mockReturnValue(testItems[0])
      const dispatch = vi.fn()
      const args = testItems[0]
      const thunkFn = postNewItem(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(testItems[0])
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      addItem.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = testItems[0]
      const thunkFn = postNewItem(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
})

const testItems = [
  {
    itemsId: 1,
    userId: 1,
    username: 'HairyHarry123',
    postcode: 5010,
    itemName: 'Hummus',
    allergens: 'nuts',
    description:
      'Home-cooked Hummus that is both filling and healthy! Cooked with chickpeas, tahini, lemon juice, garlic, cumin, salt and olive oil.',
    imageUrl:
      'https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3252&q=80',
    expiry: '2022-07-18 06:38:14',
    availability: 'Yes',
    createdAt: '2022-07-19 02:00:36',
  },
  {
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
  },
]
