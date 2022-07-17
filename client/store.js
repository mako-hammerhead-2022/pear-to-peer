import { configureStore } from '@reduxjs/toolkit'
import allAvailableItemsReducer from '@/slices/allAvailableItems'
import userItemsReducer from '@/slices/userItems'
import userDataReducer from '@/slices/userData'
import currentItemReducer from '@/slices/currentItem'

const store = configureStore({
  reducer: {
    allAvailableItems: allAvailableItemsReducer,
    userItems: userItemsReducer,
    userData: userDataReducer,
    currentItem: currentItemReducer,
  },
})

export default store
