import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/github/githubUserSlice'
import reposReducer from '../features/github/githubReposSlice'

const rootReducer = combineReducers({
  userReducer: userReducer,
  reposReducer: reposReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
