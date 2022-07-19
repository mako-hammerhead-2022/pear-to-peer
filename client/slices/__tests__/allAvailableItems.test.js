import { vi } from 'vitest'

import { getAllItemsWithUserInfo } from '@/apiClient/items'
import reducer, { fetchAllItems } from '@/slices/allAvailableItems'
import store from '@/store'

vi.mock('@/apiClient/items', () => ({
  getAllItemsWithUserInfo: vi.fn(),
}))

afterEach(() => {
  vi.resetAllMocks()
})

afterAll(() => {
  vi.clearAllMocks()
})

describe('allAvailableItems reducer', () => {
  it('should have an initial state of an empty array', () => {
    const state = store.getState().allAvailableItems
    expect(state).toEqual([])
  })
  describe('fetchAllItems.fulfilled', () => {
    it('should set the state as the payload', () => {
      const previousState = []

      expect(
        reducer(previousState, fetchAllItems.fulfilled(testItems))
      ).toEqual(testItems)
    })
  })
})

describe('fetchAllItems thunk', () => {
  it('should have a descriptive action prefix and types', () => {
    const expectedPrefix = 'allAvailableItems/fetchAll'
    expect(fetchAllItems.typePrefix).toBe(expectedPrefix)
    expect(fetchAllItems.fulfilled.type).toBe(`${expectedPrefix}/fulfilled`)
    expect(fetchAllItems.pending.type).toBe(`${expectedPrefix}/pending`)
    expect(fetchAllItems.rejected.type).toBe(`${expectedPrefix}/rejected`)
  })
  it('should call dispatch with given args (none) and a /pending action type', async () => {
    const dispatch = vi.fn()
    const thunkFn = fetchAllItems()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunkFn(dispatch, () => {}, undefined)

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        meta: expect.objectContaining({
          arg: undefined,
          requestStatus: 'pending',
        }),
        payload: undefined,
        type: `${fetchAllItems.typePrefix}/pending`,
      })
    )
  })
  it('should call the api client function with expected args (none)', async () => {
    const dispatch = vi.fn()
    const thunkFn = fetchAllItems()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunkFn(dispatch, () => {}, undefined)
    expect(getAllItemsWithUserInfo).toHaveBeenNthCalledWith(1)
  })
  it('should return data from the API client function as a payload', async () => {
    getAllItemsWithUserInfo.mockReturnValue(testItems)
    const dispatch = vi.fn()
    const thunkFn = fetchAllItems()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const result = await thunkFn(dispatch, () => {}, undefined)
    expect(result.type).toContain('/fulfilled')
    expect(result.payload).toEqual(testItems)
  })
  it('should return a /rejected action type on API client rejecting request', async () => {
    getAllItemsWithUserInfo.mockReturnValue(Promise.reject())
    const dispatch = vi.fn()
    const thunkFn = fetchAllItems()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const result = await thunkFn(dispatch, () => {}, undefined)
    expect(result.type).toContain('/rejected')
    expect(result.payload).toBeUndefined()
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
