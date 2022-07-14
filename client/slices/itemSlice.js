import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllItems, addItem } from '@/apiClient/users'

const initialState = { items: [], loading: false, error: null }

export const postNewItem = createAsyncThunk('items/postNew', async (item) => {
  const response = await addItem(item)
  console.log('addItem response', response)
  return response
})

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setNewItem: (state, action) => {
      state.items = action.payload
    },
  },

  extraReducers: {
    [postNewItem.fulfilled]: (state, { payload }) => {
      console.log('postItemPayload', payload)
      return { ...state, items: payload }
    },
  },
})
export const { setNewItem } = itemSlice.actions

export default itemSlice.reducer
