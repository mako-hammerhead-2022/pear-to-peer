import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsers, addUser } from '@/apiClient/users'

const initialState = {
  auth0Id: '',
  email: '',
  token: '',
}

export const postNewUser = createAsyncThunk(
  'userData/postNew',
  async (user) => {
    console.log('dispatched postNewUser')
    const response = await addUser(user)
    console.log('addUser response', response)
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
      console.log('newUser details', payload)
      return { ...state, ...payload }
    },
  },
})

export const { setLoggedInUser } = usersSlice.actions

export default usersSlice.reducer

//by default reducers from one createSlice will only respond to actions from that same createSlice. If we want a slice to respond to actions from another slice, we need to use extraReducers.
