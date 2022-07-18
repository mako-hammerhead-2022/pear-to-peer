import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { addUser, getUserByAuth0Id } from '@/apiClient/users'

const initialState = {
  data: {
    auth0Id: '',
    email: '',
    token: '',
  },
  loading: null,
  error: null,
}

export const fetchUserByAuth0Id = createAsyncThunk(
  'userData/fetchByAuth0Id',
  async ({ token }) => {
    const response = await getUserByAuth0Id({ token })
    return response
  }
)

export const postNewUser = createAsyncThunk(
  'userData/postNew',
  async ({ user, token }) => {
    const response = await addUser(user, token)
    return response
  }
)

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoggedInUser: (state, { payload }) => {
      return { ...state, data: { ...state.data, ...payload.userToSave } }
    },
  },

  extraReducers: {
    [postNewUser.pending]: (state) => {
      return { ...state, loading: 'pending' }
    },
    [postNewUser.fulfilled]: (state, { payload }) => {
      return { ...state, data: { ...state.data, ...payload }, loading: 'done' }
    },
    [fetchUserByAuth0Id.pending]: (state) => {
      return { ...state, loading: 'pending' }
    },
    [fetchUserByAuth0Id.fulfilled]: (state, { payload }) => {
      return { ...state, data: { ...state.data, ...payload }, loading: 'done' }
    },
  },
})

export const { setLoggedInUser } = userDataSlice.actions

export default userDataSlice.reducer

//by default reducers from one createSlice will only respond to actions from that same createSlice. If we want a slice to respond to actions from another slice, we need to use extraReducers.
