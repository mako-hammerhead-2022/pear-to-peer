import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { addComment, getCommentsByItemId } from '@/apiClient/comments'
import { getItemById, updateItem } from '@/apiClient/items'

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
  async ({ newComment, token }) => {
    const response = await addComment(newComment, token)
    return response
  }
)

// when I edit an item, and when I change the availability
export const patchItem = createAsyncThunk(
  'currentItem/patchItem',
  async ({ item, token }) => {
    const response = await updateItem(item, token)
    return response
  }
)

export const currentItemSlice = createSlice({
  name: 'currentItem',
  initialState,
  reducers: {
    clearCurrentItem: () => {
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
    [patchItem.fulfilled]: (_state, { payload }) => {
      return payload
    },
  },
})

export const { clearCurrentItem } = currentItemSlice.actions

export default currentItemSlice.reducer
