import axiosClient from '../../api/axiosClient'
import type { GitHubRepo } from './githubReposSlice'
import type { GitHubUser } from './githubUserSlice'

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

export async function fetchGitHubRepos(
  username: string
): Promise<GitHubRepo[]> {
  const response = await axiosClient.get<GitHubRepo[]>(
    `users/${username}/repos`
  )

  return response.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    html_url: repo.html_url,
    updated_at: repo.updated_at,
  }))
}
