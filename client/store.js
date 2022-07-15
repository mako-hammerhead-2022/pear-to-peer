import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/slices/usersSlice'
import itemReducer from '@/slices/itemSlice'

const store = configureStore({
  reducer: {
    userData: usersReducer,
    itemData: itemReducer,
  },
})

export default store
