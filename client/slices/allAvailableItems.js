import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getAllItemsWithUserInfo } from '@/apiClient/items'

const initialState = []

export const fetchAllItems = createAsyncThunk(
  'allAvailableItems/fetchAll',
  async () => {
    const response = await getAllItemsWithUserInfo()
    return response
  }
)

export const allAvailableItemsSlice = createSlice({
  name: 'allAvailableItems',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllItems.fulfilled]: (state, { payload }) => {
      return payload
    },
  },
})
// eslint-disable-next-line no-empty-pattern
export const {} = allAvailableItemsSlice.actions

export default allAvailableItemsSlice.reducer
