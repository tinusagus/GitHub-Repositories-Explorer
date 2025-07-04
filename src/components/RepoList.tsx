import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaGithub, FaSpinner, FaStar } from 'react-icons/fa'
import './RepoList.css'

interface Props {
  username: string
}

interface Repo {
  id: number
  name: string
  description: string
  stargazers_count: number
  html_url: string
}

const RepoList: React.FC<Props> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        )
        setRepos(response.data)
      } catch (error) {
        console.error('Error fetching repos', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [username])

  if (loading)
    return (
      <div className="loading">
        <FaSpinner className="spin" /> Loading Repositories...
      </div>
    )

  if (repos.length === 0) return <p>No repositories found.</p>

  return (
    <ul className="repo-list">
      {repos.map((repo) => (
        <li key={repo.id} className="repo-item">
          <div className="repo-header">
            <div className="repo-title">
              <strong>{repo.name}</strong>
              <span className="repo-stars">
                {repo.stargazers_count} <FaStar />
              </span>
            </div>
          </div>
          <p className="repo-description">{repo.description}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <FaGithub /> View on GitHub
          </a>
        </li>
      ))}
    </ul>
  )
}

export default RepoList
