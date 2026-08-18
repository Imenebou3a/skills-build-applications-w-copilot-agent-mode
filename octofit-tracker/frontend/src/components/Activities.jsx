import { displayName, useApi, API_BASE_URL } from '../api.js'

export default function Activities() {
  const endpoint = `${API_BASE_URL}/api/activities/`
  const { items, loading, error } = useApi(endpoint)

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Activity feed</h2>
        <span>{items.length} records</span>
      </div>

      {loading && <p className="status">Loading data...</p>}
      {error && <p className="status error">{error}</p>}

      <div className="activity-list">
        {items.map((activity) => (
          <article
            className="list-row"
            key={activity._id || `${activity.type}-${activity.completedAt}`}
          >
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
