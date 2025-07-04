import axiosClient from '../../api/axiosClient'
import type { GitHubUser } from './githubSlice'

interface GitHubUserSearchResponse {
  items: GitHubUser[]
}

export async function fetchGitHubUsers(query: string): Promise<GitHubUser[]> {
  const response = await axiosClient.get<GitHubUserSearchResponse>(
    'search/users',
    {
      params: {
        q: query,
        per_page: 5,
      },
    }
  )

  return response.data.items.map((user) => ({
    id: user.id,
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
  }))
}
