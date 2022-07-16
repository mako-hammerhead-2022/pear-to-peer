import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  // getAllItems,
  addItem,
  getAllItemsWithUserInfo,
  getAllItemsByUserId,
} from '@/apiClient/items'
import { getCommentsByItemId } from '@/apiClient/comments'
import { addComment } from '../apiClient/comments'

const initialState = { items: [] }

// export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => {
//   const response = await getAllItems()
//   console.log('response is', response)
//   return response
// })

export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => {
  const response = await getAllItemsWithUserInfo()
  // console.log('response is', response)
  return response
})

export const fetchComments = createAsyncThunk(
  'items/fetchComments',
  async (itemId) => await getCommentsByItemId(itemId)
)

export const postNewItem = createAsyncThunk('items/postNew', async (item) => {
  // console.log('itemToPost', item)
  const response = await addItem(item)
  // console.log('addItem response', response)
  return response.body
})

//What is the string for? Should we be changing the name in the slice?
export const fetchItemsByUserId = createAsyncThunk(
  'items/fetchUserItems',
  async (id) => {
    const response = await getAllItemsByUserId(id)
    console.log('getitemsbyuserid', response)
    return response
  }
)

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
      console.log('payload', payload)
      return { ...state, items: payload }
    },
    [postNewItem.fulfilled]: (state, { payload }) => {
      console.log('postItemPayload', payload)
      return { ...state, items: [...state.items, payload] }
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      console.log('fetchComments payload', payload)
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
      console.log('payload', payload)
      return { ...state, items: payload }
    },
    [postComment.fulfilled]: (state, { payload }) => {
      console.log('postCommentPayload', payload)
      return {
        ...state,
        items: state.items.map((item) => {
          return item.itemsId == payload.itemId
            ? { ...item, comments: [...item.comments, payload] }
            : item
        }),
      }
    },
  },
})
export const { setNewItem } = itemSlice.actions

export default itemSlice.reducer
