
import { configureStore } from '@reduxjs/toolkit'
import authReducers from './reducers/auth.reducers'
import noteReducers from './reducers/note.reducers'

export default configureStore({
  reducer: {
    auth: authReducers,
    note: noteReducers,
  }
})