import { useEffect, useState } from 'react'
import { displayName } from '../api.js'

export default function Activities() {
  const [items, setItems] = useState([])
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.data || data.results || data.items || []))
      .catch((error) => console.error('Activities API error:', error))
  }, [endpoint])

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Activity feed</h2>
        <span>{items.length} records</span>
      </div>

      <div className="activity-list">
        {items.map((activity) => (
          <article className="list-row" key={activity._id}>
            <span className="row-mark">
              {activity.type?.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <strong>{activity.type}</strong>
              <small>
                {displayName(activity.userId)} ·{' '}
                {activity.completedAt
                  ? new Date(activity.completedAt).toLocaleDateString()
                  : 'Date pending'}
              </small>
            </div>
            <b>{activity.durationMinutes} min</b>
            <b>{activity.calories} kcal</b>
          </article>
        ))}
      </div>
    </section>
  )
}
