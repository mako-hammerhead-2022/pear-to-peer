import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addUser, getUserByAuth0Id } from '@/apiClient/users'

const initialState = {
  auth0Id: '',
  email: '',
  token: '',
}

export const fetchUserByAuth0Id = createAsyncThunk(
  'users/fetchByAuth0Id',
  async (auth0Id) => {
    const response = await getUserByAuth0Id(auth0Id)
    return response
  }
)

export const postNewUser = createAsyncThunk(
  'userData/postNew',
  async (user) => {
    const response = await addUser(user)
    return response.body
  }
)

export const usersSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoggedInUser: (state, { payload }) => {
      return { ...state, ...payload.userToSave }
    },
  },

  extraReducers: {
    [postNewUser.fulfilled]: (state, { payload }) => {
      return { ...state, ...payload }
    },
    [fetchUserByAuth0Id.fulfilled]: (state, { payload }) => {
      return { ...state, ...payload }
    },
  },
})

export const { setLoggedInUser } = usersSlice.actions

export default usersSlice.reducer

//by default reducers from one createSlice will only respond to actions from that same createSlice. If we want a slice to respond to actions from another slice, we need to use extraReducers.
