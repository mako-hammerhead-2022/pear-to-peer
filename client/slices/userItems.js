import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addItem, getAllItemsByUserId } from '@/apiClient/items'

const initialState = []

export const fetchItemsByUserId = createAsyncThunk(
  'userItems/fetchItems',
  async (id) => {
    const response = await getAllItemsByUserId(id)
    return response
  }
)

export const postNewItem = createAsyncThunk(
  'userItems/postNew',
  async ({ item, token }) => {
    const response = await addItem(item, token)
    return response.body
  }
)

export const userItemsSlice = createSlice({
  name: 'userItems',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItemsByUserId.fulfilled]: (state, { payload }) => {
      return payload
    },
    [postNewItem.fulfilled]: (state, { payload }) => {
      return [...state, payload]
    },
  },
})

export const {} = userItemsSlice.actions

export default userItemsSlice.reducer
