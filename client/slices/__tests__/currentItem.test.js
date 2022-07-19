import { vi } from 'vitest'

import { addComment, getCommentsByItemId } from '@/apiClient/comments'
import { getItemById, updateItem } from '@/apiClient/items'
import reducer, { clearCurrentItem } from '@/slices/currentItem'
import {
  fetchComments,
  fetchItemById,
  patchItem,
  postComment,
} from '@/slices/currentItem'
import store from '@/store'

vi.mock('@/apiClient/items', () => ({
  getItemById: vi.fn(),
  updateItem: vi.fn(),
}))

vi.mock('@/apiClient/comments', () => ({
  addComment: vi.fn(),
  getCommentsByItemId: vi.fn(),
}))

let state
beforeEach(() => {
  state = store.getState().currentItem
})

afterEach(() => {
  vi.resetAllMocks()
})

afterAll(() => {
  vi.clearAllMocks()
})

describe('currentItem reducer', () => {
  it('should have an initial state of an empty object', () => {
    expect(state).toEqual({})
  })
  describe('clearCurrentItem', () => {
    it('should return the state to an empty object', () => {
      const previousState = { ...testItem }

      expect(reducer(previousState, clearCurrentItem())).toEqual({})
    })
  })
  describe('fetchComments.fulfilled', () => {
    it('should add the payload to the current state with a key of comments', () => {
      const previousState = { ...testItem }

      expect(
        reducer(previousState, fetchComments.fulfilled(testComments))
      ).toEqual({ ...previousState, comments: testComments })
    })
  })
  describe('fetchItemById.fulfilled', () => {
    it('should set the current state to the payload', () => {
      const previousState = {}

      expect(reducer(previousState, fetchItemById.fulfilled(testItem))).toEqual(
        testItem
      )
    })
  })
  describe('postComment.fulfilled', () => {
    it('should append the comment to the comments array within the currentItem object', () => {
      const previousState = { ...testItem, comments: [testComments[0]] }

      expect(
        reducer(previousState, postComment.fulfilled(testComments[1]))
      ).toEqual({ ...testItem, comments: [...testComments] })
    })
  })
  describe('patchItem.fulfilled', () => {
    it('should set the state to the payload', () => {
      const previousState = { ...testItem }
      const updated = { ...testItem, description: 'whatever' }

      expect(reducer(previousState, patchItem.fulfilled(updated))).toEqual(
        updated
      )
    })
  })
})

describe('currentItems thunks', () => {
  describe('fetchItemById', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'currentItem/fetchItem'
      expect(fetchItemById.typePrefix).toBe(expectedPrefix)
      expect(fetchItemById.fulfilled.type).toBe(`${expectedPrefix}/fulfilled`)
      expect(fetchItemById.pending.type).toBe(`${expectedPrefix}/pending`)
      expect(fetchItemById.rejected.type).toBe(`${expectedPrefix}/rejected`)
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemById(args)
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
          type: `${fetchItemById.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemById(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(getItemById).toHaveBeenNthCalledWith(1, args)
    })
    it('should return data from the API client function as a payload', async () => {
      getItemById.mockReturnValue(testItem)
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemById(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(testItem)
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      getItemById.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchItemById(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
  describe('fetchComments', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'currentItem/fetchComments'
      expect(fetchComments.typePrefix).toBe(expectedPrefix)
      expect(fetchComments.fulfilled.type).toBe(`${expectedPrefix}/fulfilled`)
      expect(fetchComments.pending.type).toBe(`${expectedPrefix}/pending`)
      expect(fetchComments.rejected.type).toBe(`${expectedPrefix}/rejected`)
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = 2
      const thunkFn = fetchComments(args)
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
          type: `${fetchComments.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchComments(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(getCommentsByItemId).toHaveBeenNthCalledWith(1, args)
    })
    it('should return data from the API client function as a payload', async () => {
      getCommentsByItemId.mockReturnValue(testComments)
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchComments(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(testComments)
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      getCommentsByItemId.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = 1
      const thunkFn = fetchComments(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
  describe('postComment', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'currentItem/postComment'
      expect(postComment.typePrefix).toBe(expectedPrefix)
      expect(postComment.fulfilled.type).toBe(`${expectedPrefix}/fulfilled`)
      expect(postComment.pending.type).toBe(`${expectedPrefix}/pending`)
      expect(postComment.rejected.type).toBe(`${expectedPrefix}/rejected`)
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = testComments[0]
      const thunkFn = postComment(args)
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
          type: `${postComment.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = { newComment: testComments[0], token: 'token' }
      const thunkFn = postComment(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(addComment).toHaveBeenNthCalledWith(1, args.newComment, args.token)
    })
    it('should return data from the API client function as a payload', async () => {
      addComment.mockReturnValue(testComments[0])
      const dispatch = vi.fn()
      const args = { newComment: testComments[0], token: 'token' }
      const thunkFn = postComment(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(testComments[0])
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      addComment.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = { newComment: testComments[0], token: 'token' }
      const thunkFn = postComment(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
  describe('patchItem', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'currentItem/patchItem'
      expect(patchItem.typePrefix).toBe(expectedPrefix)
      expect(patchItem.fulfilled.type).toBe(`${expectedPrefix}/fulfilled`)
      expect(patchItem.pending.type).toBe(`${expectedPrefix}/pending`)
      expect(patchItem.rejected.type).toBe(`${expectedPrefix}/rejected`)
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = { ...testItem, description: 'shiny' }
      const thunkFn = patchItem(args)
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
          type: `${patchItem.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = {
        item: { ...testItem, description: 'mild' },
        token: 'token',
      }
      const thunkFn = patchItem(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(updateItem).toHaveBeenNthCalledWith(1, args.item, args.token)
    })
    it('should return data from the API client function as a payload', async () => {
      updateItem.mockReturnValue({ ...testItem, description: 'mild' })
      const dispatch = vi.fn()
      const args = {
        item: { ...testItem, description: 'mild' },
        token: 'token',
      }
      const thunkFn = patchItem(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(args.item)
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      updateItem.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = { ...testItem, description: 'shiny' }
      const thunkFn = patchItem(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
})

const testItem = {
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
}

const testComments = [
  {
    commentId: 1,
    authorId: 2,
    itemId: 1,
    authorName: 'SlipsAllDay',
    comment: 'Could I claim this?',
    timestamp: '2022-07-19 02:00:36',
  },
  {
    commentId: 2,
    authorId: 1,
    itemId: 1,
    authorName: 'Harold',
    comment: 'No',
    timestamp: '2022-07-19 02:00:37',
  },
]
