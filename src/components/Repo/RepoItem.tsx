import { FaGithub, FaStar } from 'react-icons/fa'
import './RepoItem.css'

interface Repo {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
  updated_at: string
}

interface Props {
  key: number
  repo: Repo
  isMobile: boolean
}

const RepoItem: React.FC<Props> = ({ repo, isMobile }) => {
  const date = new Date(repo.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <li
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
          <FaStar className={repo.stargazers_count > 0 ? 'star-active' : ''} />
        </span>
      </div>
      <span className="repo-updated">last updated on {date}</span>
      <p className="repo-description">{repo.description}</p>
    </li>
  )
}

export default RepoItem
