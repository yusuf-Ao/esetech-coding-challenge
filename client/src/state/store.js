
import { configureStore } from '@reduxjs/toolkit'
import authReducers from './reducers/auth.reducers'

export default configureStore({
  reducer: {
    auth: authReducers,
  }
})