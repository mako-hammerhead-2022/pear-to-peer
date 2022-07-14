import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addItem } from '@/apiClient/items'

const initialState = {}

export const postNewItem = createAsyncThunk('items/postNew', async (item) => {
  const response = await addItem(item)
  console.log('addItem response', response)
  return response
})

export const itemSlice = createSlice({
  name: 'itemData',
  initialState,
  reducers: {
    setNewItem: (state, { payload }) => {
      return { ...state, ...payload.userToSave }
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
