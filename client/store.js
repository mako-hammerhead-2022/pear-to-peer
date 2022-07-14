import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/slices/usersSlice'

const store = configureStore({
  reducer: {
    userData: usersReducer,
  },
})

export default store
