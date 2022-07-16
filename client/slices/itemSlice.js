import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  // getAllItems,
  addItem,
  getAllItemsWithUserInfo,
  getAllItemsByUserId,
  getItemByUserId,
} from '@/apiClient/items'
import { getCommentsByItemId } from '@/apiClient/comments'
// import {
//   getItemByIdWithUserInfo,
//   getItemsByUserId,
// } from '../../server/db/items'

import { addComment } from '../apiClient/comments'

const initialState = { items: [] }

// export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => {
//   const response = await getAllItems()
//   console.log('response is', response)
//   return response
// })

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

export const updateItem = createAsyncThunk('items/updateItem', async (id) => {
  const response = await getItemByUserId(id)
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
      console.log('postCommentPayload', payload)
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
  },
})
export const { setNewItem } = itemSlice.actions

export default itemSlice.reducer
