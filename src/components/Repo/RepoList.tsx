import React, { useEffect } from 'react'
import { fetchRepos } from '../../features/github/githubReposSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import './RepoList.css'
import { useIsMobile } from '../../hooks/useIsMobile'
import Loading from '../Loading/Loading'
import RepoItem from './RepoItem'

interface Props {
  username: string
}

const RepoList: React.FC<Props> = ({ username }) => {
  const dispatch = useDispatch()
  const { repos, loading, error } = useSelector(
    (state: RootState) => state.reposReducer
  )

  const isMobile = useIsMobile()

  useEffect(() => {
    if (username?.trim()) {
      dispatch(fetchRepos(username))
    }
  }, [dispatch, username])

  if (loading) return <Loading title="Loading Repositories..." />

  if (error) return <p>{error}</p>

  if (repos.length === 0) return <p>No repositories found.</p>

  return (
    <div className="repo-container">
      <ul className="repo-list">
        {repos.map((repo) => {
          return <RepoItem key={repo.id} repo={repo} isMobile={isMobile} />
        })}
      </ul>
    </div>
  )
}

export default RepoList
