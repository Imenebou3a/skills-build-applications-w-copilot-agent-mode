import { displayName, useApi } from '../api.js'

export default function Leaderboard() {
  const { items, loading, error } = useApi('leaderboard')

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Leaderboard</h2>
        <span>Weekly points</span>
      </div>

      {loading && <p className="status">Loading data...</p>}

      {error && <p className="status error">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="status">No leaderboard entries found.</p>
      )}

      <div className="leaderboard">
        {items.map((entry, index) => (
          <article
            className="rank-row"
            key={entry._id || displayName(entry.userId)}
          >
            <span className="rank">
              {entry.rank || index + 1}
            </span>

            <div>
              <strong>{displayName(entry.userId)}</strong>
              <small>
                {entry.teamId?.name || 'Independent athlete'}
              </small>
            </div>

            <b>{entry.points || 0} pts</b>
          </article>
        ))}
      </div>
    </section>
  )
}
