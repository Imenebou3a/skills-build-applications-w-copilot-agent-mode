import { useEffect, useState } from 'react'
export default function Users() {
  const [items, setItems] = useState([])
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.data || data.results || data.items || []))
      .catch((error) => console.error('Users API error:', error))
  }, [endpoint])

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Athletes</h2>
        <span>{items.length} profiles</span>
      </div>

      <div className="card-grid">
        {items.map((user) => (
          <article className="data-card" key={user._id}>
            <span className="avatar">
              {user.displayName?.slice(0, 1).toUpperCase()}
            </span>
            <h3>{user.displayName}</h3>
            <p>@{user.username}</p>
            <small>Goal: {user.goal}</small>
          </article>
        ))}
      </div>
    </section>
  )
}
