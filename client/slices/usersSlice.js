import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '@/apiClient/users'

const initialState = { users: [], loading: false, error: null }

//TODO: loading state

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await getAllUsers()
  console.log('response', response)
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
