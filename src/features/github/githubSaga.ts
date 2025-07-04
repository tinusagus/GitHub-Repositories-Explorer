import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  type GitHubUser,
} from './githubSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchGitHubUsers } from './githubApi'

function* handleFetchUsers(action: PayloadAction<string>) {
  try {
    const users: GitHubUser[] = yield call(fetchGitHubUsers, action.payload)
    yield put(fetchUsersSuccess(users))
  } catch (err) {
    yield put(fetchUsersFailure((err as Error).message))
  }
}

export default function* githubSaga() {
  yield takeLatest(fetchUsers.type, handleFetchUsers)
}
