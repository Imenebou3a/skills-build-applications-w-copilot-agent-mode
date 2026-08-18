import { useApi } from '../api.js'

export default function Users() {
  const { items, loading, error } = useApi('users')

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Athletes</h2>
        <span>{items.length} profiles</span>
      </div>

      {loading && <p className="status">Loading data...</p>}

      {error && <p className="status error">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="status">No users found.</p>
      )}

      <div className="card-grid">
        {items.map((user) => (
          <article
            className="data-card"
            key={user._id || user.username}
          >
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
