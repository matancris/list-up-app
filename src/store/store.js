import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './groupSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    groups: groupReducer,
    users: userReducer
  },
})