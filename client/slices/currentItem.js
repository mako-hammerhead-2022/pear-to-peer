import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getCommentsByItemId, addComment } from '@/apiClient/comments'
import { getItemById, updateItemAvailability } from '@/apiClient/items'

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

export const patchItem = createAsyncThunk(
  'userItems/patchItem',
  async (item) => {
    const response = await updateItemAvailability(item)
    return response
  }
)

export const currentItemSlice = createSlice({
  name: 'currentItem',
  initialState,
  reducers: {},
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
      return payload
    },
  },
})

export const {} = currentItemSlice.actions

export default currentItemSlice.reducer