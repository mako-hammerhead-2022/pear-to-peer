import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getCommentsByItemId, addComment } from '@/apiClient/comments'
import {
  getItemById,
  updateItemAvailability,
  updateItem,
} from '@/apiClient/items'

const initialState = {}

export const fetchItemById = createAsyncThunk(
  'currentItem/fetchItem',
  async (itemId) => await getItemById(itemId)
)

export const fetchComments = createAsyncThunk(
  'currentItem/fetchComments',
  async (itemId) => await getCommentsByItemId(itemId)
)

export const postComment = createAsyncThunk(
  'currentItem/postComment',
  async (newComment) => {
    const response = await addComment(newComment)
    return response
  }
)

// export const patchItem = createAsyncThunk(
//   'currentItem/patchItem',
//   async (item) => {
//     const response = await updateItemAvailability(item)
//     return response
//   }
// )

export const patchItem = createAsyncThunk(
  'currentItem/patchItem',
  async (item) => {
    console.log('currentitem for redux thingy is', item)
    const response = await updateItem(item)
    // console.log('patch item response', response)
    return response
  }
)

export const currentItemSlice = createSlice({
  name: 'currentItem',
  initialState,
  reducers: {
    // reset: () => initialState,
    clearCurrentItem: (state, action) => {
      return initialState
    },
  },
  extraReducers: {
    [fetchComments.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        comments: payload,
      }
    },
    [fetchItemById.fulfilled]: (state, { payload }) => {
      return { ...state, ...payload }
    },
    [postComment.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        comments: [...state.comments, payload],
      }
    },
    [patchItem.fulfilled]: (state, { payload }) => {
      return initialState
    },
  },
})

export const { clearCurrentItem } = currentItemSlice.actions

export default currentItemSlice.reducer
