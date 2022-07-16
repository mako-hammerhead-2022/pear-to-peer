import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/slices/usersSlice'
import itemsReducer from '@/slices/itemSlice'

const store = configureStore({
  reducer: {
    userData: usersReducer,
    itemData: itemsReducer,
  },
})

export default store
