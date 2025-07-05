import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  fetchRepos,
  fetchReposFailure,
  fetchReposSuccess,
  type GitHubRepo,
} from './githubReposSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchGitHubRepos, fetchGitHubUsers } from './githubApi'
import {
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  type GitHubUser,
} from './githubUserSlice'

function* handleFetchUsers(action: PayloadAction<string>) {
  try {
    const users: GitHubUser[] = yield call(fetchGitHubUsers, action.payload)
    yield put(fetchUsersSuccess(users))
  } catch (err) {
    yield put(fetchUsersFailure((err as Error).message))
  }
}

function* handleFetchRepos(action: PayloadAction<string>) {
  try {
    const repos: GitHubRepo[] = yield call(fetchGitHubRepos, action.payload)
    yield put(fetchReposSuccess(repos))
  } catch (err) {
    yield put(fetchReposFailure((err as Error).message))
  }
}

export default function* githubSaga() {
  yield takeLatest(fetchUsers.type, handleFetchUsers)
  yield takeLatest(fetchRepos.type, handleFetchRepos)
}
