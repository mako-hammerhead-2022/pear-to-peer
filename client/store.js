import { configureStore } from '@reduxjs/toolkit'

import allAvailableItemsReducer from '@/slices/allAvailableItems'
import currentItemReducer from '@/slices/currentItem'
import userDataReducer from '@/slices/userData'
import userItemsReducer from '@/slices/userItems'

const store = configureStore({
  reducer: {
    allAvailableItems: allAvailableItemsReducer,
    userItems: userItemsReducer,
    userData: userDataReducer,
    currentItem: currentItemReducer,
  },
})

export default store
