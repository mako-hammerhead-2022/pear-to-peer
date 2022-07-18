import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addItem, getAllItemsByUserId, updateItem } from '@/apiClient/items'

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
    return response
  }
)

export const patchItem = createAsyncThunk(
  'currentItem/patchItem',
  async (item) => {
    console.log('currentitem for redux thingy is', item)
    const response = await updateItem(item)
    console.log('patch item response', response)
    return response
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
    [patchItem.fulfilled]: (state, { payload }) => {
      const updatedItemArray = state.map((item) => {
        if (item.itemsId === payload.id) {
          return {
            ...item,
            availability: payload.availability,
          }
        } else return item
      })
      return [...updatedItemArray]
    },
  },
})

export const {} = userItemsSlice.actions

export default userItemsSlice.reducer
