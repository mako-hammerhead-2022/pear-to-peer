import { vi } from 'vitest'

import { addUser, getUserByAuth0Token } from '@/apiClient/users'
import reducer, {
  fetchByAuth0Token,
  postNewUser,
  setLoggedInUser,
} from '@/slices/userData'
import store from '@/store'

import { fetchUserByAuth0Token } from '../userData'

vi.mock('@/apiClient/users', () => ({
  addUser: vi.fn(),
  getUserByAuth0Token: vi.fn(),
}))

afterEach(() => {
  vi.resetAllMocks()
})

afterAll(() => {
  vi.clearAllMocks()
})

describe('userData reducer', () => {
  const initialState = {
    data: {
      auth0Id: '',
      email: '',
      token: '',
    },
    loading: null,
    error: null,
  }
  it('should have an initial state', () => {
    const state = store.getState().userData
    expect(state).toEqual(initialState)
  })
  describe('setLoggedInUser', () => {
    it('should append the auth0 details to the data object within state', () => {
      expect(
        reducer(initialState, setLoggedInUser({ userToSave: testAuth0details }))
      ).toEqual({
        ...initialState,
        data: expect.objectContaining({
          ...testAuth0details,
        }),
      })
    })
  })
  describe('postNewUser.pending', () => {
    it("should set the loading string to 'pending'", () => {
      const previousState = { ...initialState }

      expect(reducer(previousState, postNewUser.pending)).toEqual({
        ...previousState,
        loading: 'pending',
      })
    })
  })
  describe('postNewUser.fulfilled', () => {
    it("should set append the payload to data and set loading to 'done'", () => {
      const previousState = { ...initialState, data: { ...testAuth0details } }

      expect(reducer(previousState, postNewUser.fulfilled(testUser))).toEqual({
        ...previousState,
        data: expect.objectContaining({ ...testUser }),
        loading: 'done',
      })
    })
  })
  describe('fetchUserByAuth0Token.pending', () => {
    it('should set the loading string to pending', () => {
      const previousState = { ...initialState, data: { ...testAuth0details } }

      expect(reducer(previousState, fetchUserByAuth0Token.pending())).toEqual({
        ...previousState,
        loading: 'pending',
      })
    })
  })
  describe('fetchUserByAuth0Token.fulfilled', () => {
    it('should append the payload to data and set loading to done', () => {
      const previousState = { ...initialState, data: { ...testAuth0details } }

      expect(
        reducer(previousState, fetchUserByAuth0Token.fulfilled(testUser))
      ).toEqual({
        ...previousState,
        data: { ...testAuth0details, ...testUser },
        loading: 'done',
      })
    })
  })
})

describe('userData thunks', () => {
  describe('fetchUserByAuth0Token', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'userData/fetchByAuth0Token'
      expect(fetchUserByAuth0Token.typePrefix).toBe(expectedPrefix)
      expect(fetchUserByAuth0Token.fulfilled.type).toBe(
        `${expectedPrefix}/fulfilled`
      )
      expect(fetchUserByAuth0Token.pending.type).toBe(
        `${expectedPrefix}/pending`
      )
      expect(fetchUserByAuth0Token.rejected.type).toBe(
        `${expectedPrefix}/rejected`
      )
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = testAuth0details.token
      const thunkFn = fetchUserByAuth0Token(args)
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
          type: `${fetchUserByAuth0Token.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = testAuth0details.token
      const thunkFn = fetchUserByAuth0Token(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(getUserByAuth0Token).toHaveBeenNthCalledWith(1, args)
    })
    it('should return data from the API client function as a payload', async () => {
      getUserByAuth0Token.mockReturnValue(testUser)
      const dispatch = vi.fn()
      const args = testAuth0details.token
      const thunkFn = fetchUserByAuth0Token(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(testUser)
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      getUserByAuth0Token.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = testAuth0details.token
      const thunkFn = fetchUserByAuth0Token(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
  describe('postNewUser', () => {
    it('should have a descriptive action prefix and types', () => {
      const expectedPrefix = 'userData/postNew'
      expect(postNewUser.typePrefix).toBe(expectedPrefix)
      expect(postNewUser.fulfilled.type).toBe(`${expectedPrefix}/fulfilled`)
      expect(postNewUser.pending.type).toBe(`${expectedPrefix}/pending`)
      expect(postNewUser.rejected.type).toBe(`${expectedPrefix}/rejected`)
    })
    it('should call dispatch with given args and a /pending action type', async () => {
      const dispatch = vi.fn()
      const args = { user: testUser, token: testAuth0details.token }
      const thunkFn = postNewUser(args)
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
          type: `${postNewUser.typePrefix}/pending`,
        })
      )
    })
    it('should call the api client function with expected args', async () => {
      const dispatch = vi.fn()
      const args = { user: testUser, token: testAuth0details.token }
      const thunkFn = postNewUser(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await thunkFn(dispatch, () => {}, undefined)
      expect(addUser).toHaveBeenNthCalledWith(1, args.user, args.token)
    })
    it('should return data from the API client function as a payload', async () => {
      addUser.mockReturnValue(testUser)
      const dispatch = vi.fn()
      const args = { user: testUser, token: testAuth0details.token }
      const thunkFn = postNewUser(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/fulfilled')
      expect(result.payload).toEqual(testUser)
    })
    it('should return a /rejected action type on API client rejecting request', async () => {
      addUser.mockReturnValue(Promise.reject())
      const dispatch = vi.fn()
      const args = { user: testUser, token: testAuth0details.token }
      const thunkFn = postNewUser(args)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = await thunkFn(dispatch, () => {}, undefined)
      expect(result.type).toContain('/rejected')
      expect(result.payload).toBeUndefined()
    })
  })
})

const testUser = {
  id: 1,
  auth0Id: 'auth0|1',
  name: 'One',
  username: 'the_one',
  email: 'one@example.com',
  postcode: 1001,
}

const testAuth0details = {
  auth0Id: 'auth0|1',
  email: 'one@example.com',
  token: 'testtoken',
}
