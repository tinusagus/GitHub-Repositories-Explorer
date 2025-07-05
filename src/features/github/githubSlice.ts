import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string
  stargazers_count: number
  html_url: string
  updated_at: string
}

interface GitHubState {
  users: GitHubUser[]
  loading: boolean
  error: string | null
  repos: GitHubRepo[]
  loadingRepos: boolean
  errorRepos: string | null
}

const initialState: GitHubState = {
  users: [],
  loading: false,
  error: null,
  repos: [],
  loadingRepos: false,
  errorRepos: null,
}

const githubSlice = createSlice({
  name: 'github',
  initialState,

  reducers: {
    fetchUsers: {
      reducer: (state) => {
        state.loading = true
        state.error = null
      },
      prepare: (query: string) => ({
        payload: query,
      }),
    },

    fetchUsersSuccess: (state, action: PayloadAction<GitHubUser[]>) => {
      state.loading = false
      state.users = action.payload
    },

    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    fetchRepos: {
      reducer: (state) => {
        state.loadingRepos = true
        state.error = null
      },
      prepare: (query: string) => ({
        payload: query,
      }),
    },

    fetchReposSuccess: (state, action: PayloadAction<GitHubRepo[]>) => {
      state.loadingRepos = false
      state.repos = action.payload
    },

    fetchReposFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchRepos,
  fetchReposSuccess,
  fetchReposFailure,
} = githubSlice.actions

export default githubSlice.reducer
