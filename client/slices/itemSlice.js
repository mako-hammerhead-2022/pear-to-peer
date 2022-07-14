import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllItems, addItem } from '@/apiClient/items'

const initialState = { items: [] }

export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => {
  const response = await getAllItems()
  console.log('response is', response)
  return response
})

export const postNewItem = createAsyncThunk('items/postNew', async (item) => {
  const response = await addItem(item)
  console.log('addItem response', response)
  return response
})

export const itemSlice = createSlice({
  name: 'itemData',
  initialState,
  reducers: {
    // setAllItems: (state, {payload}) => {
    //   return {...state, }
    // },
    setNewItem: (state, { payload }) => {
      return { ...state, ...payload.userToSave }
    },
  },

  extraReducers: {
    [fetchAllItems.fulfilled]: (state, { payload }) => {
      console.log('payload', payload)
      return { ...state, items: payload }
    },
    [postNewItem.fulfilled]: (state, { payload }) => {
      console.log('postItemPayload', payload)
      return { ...state, items: payload }
    },
  },
})
export const { setNewItem } = itemSlice.actions

export default itemSlice.reducer
