import { useEffect, useState } from 'react'
import { displayName } from '../api.js'

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.data || data.results || data.items || []))
      .catch((error) => console.error('Leaderboard API error:', error))
  }, [endpoint])

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Leaderboard</h2>
        <span>Weekly points</span>
      </div>

      <div className="leaderboard">
        {items.map((entry, index) => (
          <article className="rank-row" key={entry._id}>
            <span className="rank">{entry.rank || index + 1}</span>
            <div>
              <strong>{displayName(entry.userId)}</strong>
              <small>{entry.teamId?.name || 'Independent athlete'}</small>
            </div>
            <b>{entry.points} pts</b>
          </article>
        ))}
      </div>
    </section>
  )
}
