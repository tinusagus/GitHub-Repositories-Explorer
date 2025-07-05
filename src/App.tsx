import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import UserList from './components/User/UserList'

function App() {
  return (
    <div className="app">
      <h1>GitHub User Explorer</h1>
      <SearchForm />
      <UserList />
    </div>
  )
}

export default App
