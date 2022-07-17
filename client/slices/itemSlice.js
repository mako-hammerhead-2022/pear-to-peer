import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addItem,
  getAllItemsWithUserInfo,
  getAllItemsByUserId,
  updateItemAvailability,
} from '@/apiClient/items'
import { getCommentsByItemId, addComment } from '@/apiClient/comments'

const initialState = { items: [] }

export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => {
  const response = await getAllItemsWithUserInfo()
  return response
})

export const fetchComments = createAsyncThunk(
  'items/fetchComments',
  async (itemId) => await getCommentsByItemId(itemId)
)

export const postNewItem = createAsyncThunk('items/postNew', async (item) => {
  const response = await addItem(item)
  return response.body
})

//What is the string for? Should we be changing the name in the slice?
export const fetchItemsByUserId = createAsyncThunk(
  'items/fetchUserItems',
  async (id) => {
    const response = await getAllItemsByUserId(id)
    return response
  }
)

export const patchItem = createAsyncThunk('items/patchItem', async (item) => {
  const response = await updateItemAvailability(item)
  return response
})

export const postComment = createAsyncThunk(
  'items/postComment',
  async (newComment) => {
    const response = await addComment(newComment)
    return response
  }
)

export const itemSlice = createSlice({
  name: 'itemData',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllItems.fulfilled]: (state, { payload }) => {
      return { ...state, items: payload }
    },
    [postNewItem.fulfilled]: (state, { payload }) => {
      return { ...state, items: [...state.items, payload] }
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        items: state.items.map((item) => {
          return item.itemsId == payload.id
            ? { ...item, comments: payload.comments }
            : item
        }),
      }
    },
    [fetchItemsByUserId.fulfilled]: (state, { payload }) => {
      return { ...state, items: payload }
    },
    [postComment.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        items: state.items.map((item) => {
          return item.itemsId == payload.itemId
            ? {
                ...item,
                comments: item.comments
                  ? [...item.comments, payload]
                  : [payload],
              }
            : item
        }),
      }
    },
    [patchItem.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        items: state.items.map((item) => {
          return item.itemsId == payload.itemsId ? payload : item
        }),
      }
    },
  },
})
export const {} = itemSlice.actions

export default itemSlice.reducer
