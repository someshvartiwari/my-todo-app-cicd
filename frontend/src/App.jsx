import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(true)

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setError('')
        const response = await axios.get(API_URL)
        setTodos(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        setError('Backend se connection nahi ho pa raha. Spring Boot start karke dobara refresh karo.')
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  const addTodo = async (event) => {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle || saving) return

    try {
      setSaving(true)
      setError('')
      const response = await axios.post(API_URL, {
        title: cleanTitle,
        completed: false,
      })
      setTodos((current) => [...current, response.data])
      setTitle('')
    } catch (err) {
      setError('Todo save nahi hua. Backend aur PostgreSQL connection check karo.')
    } finally {
      setSaving(false)
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="workspace">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Taskflow home">
            <span className="brand-mark">✓</span>
            <span>taskflow<span className="brand-dot">.</span></span>
          </a>
          <span className="topbar-label"><span className="live-dot" /> PERSONAL WORKSPACE</span>
        </header>

        <section className="hero">
          <p className="eyebrow">A LITTLE MORE FOCUS, EVERY DAY</p>
          <h1>Make room for<br /><span>what matters.</span></h1>
          <p className="hero-copy">Keep your thoughts organised. One task at a time.</p>
        </section>

        <section className="todo-panel">
          <button
            className="panel-heading"
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            aria-expanded={isDropdownOpen}
          >
            <span className="heading-left">
              <span className="list-icon">☷</span>
              <span>
                <strong>My to-do list</strong>
                <small>Your tasks, all in one place</small>
              </span>
            </span>
            <span className={`chevron ${isDropdownOpen ? 'open' : ''}`}>⌄</span>
          </button>

          {isDropdownOpen && (
            <div className="panel-content">
              <form className="add-form" onSubmit={addTodo}>
                <label className="sr-only" htmlFor="todo-title">New task</label>
                <span className="input-plus">＋</span>
                <input
                  id="todo-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Add a task you want to get done..."
                  maxLength={500}
                />
                <button type="submit" disabled={!title.trim() || saving}>
                  {saving ? 'Saving...' : 'Add task'}
                </button>
              </form>

              {error && <div className="error-message" role="alert">{error}</div>}

              <div className="list-meta">
                <span>YOUR TASKS <b>{todos.length}</b></span>
                <span>{completedCount} completed</span>
              </div>

              {loading ? (
                <div className="empty-state">
                  <span className="loader" />
                  <p>Loading your tasks...</p>
                </div>
              ) : todos.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">✦</span>
                  <strong>Your list is clear</strong>
                  <p>Add your first task above and get started.</p>
                </div>
              ) : (
                <ul className="todo-list">
                  {todos.map((todo) => (
                    <li className="todo-item" key={todo.id}>
                      <span className={`task-indicator ${todo.completed ? 'completed' : ''}`}>
                        {todo.completed ? '✓' : ''}
                      </span>
                      <span className={`task-title ${todo.completed ? 'completed-text' : ''}`}>
                        {todo.title}
                      </span>
                      <span className="task-status">
                        {todo.completed ? 'Done' : 'To do'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        <footer className="footer">
          <span>Built for better days.</span>
          <span>React <i>·</i> Spring Boot <i>·</i> PostgreSQL</span>
        </footer>
      </section>
    </main>
  )
}

export default App
