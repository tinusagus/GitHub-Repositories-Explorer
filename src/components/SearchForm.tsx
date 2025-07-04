import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../features/github/githubSlice'
import './SearchForm.css'

const SearchForm: React.FC = () => {
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
        <p className="showing-user">Showing users for "{lastSearchedQuery}"</p>
      )}
    </form>
  )
}

export default SearchForm
