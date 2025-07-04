import { combineReducers } from '@reduxjs/toolkit'
import githubReducer from '../features/github/githubSlice'

const rootReducer = combineReducers({
  github: githubReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
