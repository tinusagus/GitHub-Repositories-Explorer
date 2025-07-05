import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

interface GitHubState {
  users: GitHubUser[]
  loading: boolean
  error: string | null
}

const initialState: GitHubState = {
  users: [],
  loading: false,
  error: null,
}

const githubSlice = createSlice({
  name: 'user',
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
  },
})

export const { fetchUsers, fetchUsersSuccess, fetchUsersFailure } =
  githubSlice.actions

export default githubSlice.reducer
