import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa'
import type { RootState } from '../../store'
import './UserList.css'
import RepoList from '../RepoList'

const UserList: React.FC = () => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.github
  )

  const [expandedUser, setExpandedUser] = useState<string | null>(null)

  if (loading)
    return (
      <div className="loading">
        <FaSpinner className="spin" /> Loading Users...
      </div>
    )
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (users.length === 0) return <p>No users found.</p>

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <div
            className="user-item-row"
            onClick={() =>
              setExpandedUser(user.login === expandedUser ? null : user.login)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              setExpandedUser(user.login === expandedUser ? null : user.login)
            }
          >
            <span className="user-header">{user.login}</span>
            {expandedUser === user.login ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedUser === user.login && (
            <div className="repo-container">
              <RepoList username={user.login} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default UserList
