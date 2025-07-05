import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../features/github/githubSlice'
import './SearchForm.css'
import type { RootState } from '../../store'

const SearchForm: React.FC = () => {
  const { users } = useSelector((state: RootState) => state.github)
  const dispatch = useDispatch()

  const [query, setQuery] = useState('')
  const [lastSearchedQuery, setLastSearchedQuery] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    dispatch(fetchUsers(trimmed))
    setLastSearchedQuery(trimmed)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>

      {lastSearchedQuery && (
        <p className="showing-user">
          {users.length !== 0 ? `Showing users for ` : `No users found for `}"
          {lastSearchedQuery}"
        </p>
      )}
    </form>
  )
}

export default SearchForm
