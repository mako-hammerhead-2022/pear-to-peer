import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsers, addUser } from '@/apiClient/users'

const initialState = { users: [], loading: false, error: null }

//TODO: loading state

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await getAllUsers()
  console.log('response', response)
  return response
})

export const postNewUser = createAsyncThunk('users/postNew', async (user) => {
  console.log('dispatched postNewUser')
  const response = await addUser(user)
  console.log('addUser response', response)
  return response
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: {
    [fetchAllUsers.fulfilled]: (state, { payload }) => {
      console.log('payload', payload)
      return { ...state, users: payload }
    },
  },
})

export const {} = usersSlice.actions

export default usersSlice.reducer

//by default reducers from one createSlice will only respond to actions from that same createSlice. If we want a slice to respond to actions from another slice, we need to use extraReducers.
