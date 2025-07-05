import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface GitHubRepo {
  id: number
  name: string
  description: string
  stargazers_count: number
  html_url: string
  updated_at: string
}

interface GitHubState {
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}

const initialState: GitHubState = {
  repos: [],
  loading: false,
  error: null,
}

const githubSlice = createSlice({
  name: 'repos',
  initialState,

  reducers: {
    fetchRepos: {
      reducer: (state) => {
        state.loading = true
        state.error = null
      },
      prepare: (query: string) => ({
        payload: query,
      }),
    },

    fetchReposSuccess: (state, action: PayloadAction<GitHubRepo[]>) => {
      state.loading = false
      state.repos = action.payload
    },

    fetchReposFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchRepos, fetchReposSuccess, fetchReposFailure } =
  githubSlice.actions

export default githubSlice.reducer
