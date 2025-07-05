import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import type { RootState } from '../../store'
import RepoList from '../Repo/RepoList'
import Loading from '../Loading/Loading'
import './UserList.css'

const UserList: React.FC = () => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.github
  )

  const [expandedUser, setExpandedUser] = useState<string | null>(null)

  if (loading) return <Loading title="Loading Users..." />

  if (error) return <p className="error-message-user">{error}</p>

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
          {expandedUser === user.login && <RepoList username={user.login} />}
        </li>
      ))}
    </ul>
  )
}

export default UserList
