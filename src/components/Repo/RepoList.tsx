import React, { useEffect } from 'react'
import { FaGithub, FaStar } from 'react-icons/fa'
import { fetchRepos } from '../../features/github/githubSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import './RepoList.css'
import { useIsMobile } from '../../hooks/useIsMobile'
import Loading from '../Loading/Loading'

interface Props {
  username: string
}

const RepoList: React.FC<Props> = ({ username }) => {
  const dispatch = useDispatch()
  const { repos, loadingRepos, errorRepos } = useSelector(
    (state: RootState) => state.github
  )

  const isMobile = useIsMobile()

  useEffect(() => {
    if (username?.trim()) {
      dispatch(fetchRepos(username))
    }
  }, [dispatch, username])

  if (loadingRepos) return <Loading title="Loading Repositories..." />

  if (errorRepos) return <p>{errorRepos}</p>

  if (repos.length === 0) return <p>No repositories found.</p>

  return (
    <div className="repo-container">
      <ul className="repo-list">
        {repos.map((repo) => {
          const date = new Date(repo.updated_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <li
              key={repo.id}
              className={`repo-item ${isMobile ? 'clickable' : ''}`}
              onClick={() => {
                if (isMobile) window.open(repo.html_url, '_blank')
              }}
            >
              <div className="repo-header">
                <a
                  className="repo-title"
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => isMobile && e.preventDefault()}
                >
                  <FaGithub /> <strong>{repo.name}</strong>
                </a>

                <span className="repo-stars">
                  <p className="stars-count">{repo.stargazers_count} </p>
                  <FaStar
                    className={`${
                      repo.stargazers_count > 0 ? 'star-active' : ''
                    }`}
                  />
                </span>
              </div>
              <span className="repo-updated">last updated on {date}</span>
              <p className="repo-description">{repo.description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RepoList
