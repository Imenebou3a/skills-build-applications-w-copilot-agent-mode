import { useApi } from '../api.js'

export default function Workouts() {
  const { items, loading, error } = useApi('workouts')

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Workout library</h2>
        <span>{items.length} sessions</span>
      </div>

      {loading && <p className="status">Loading data...</p>}

      {error && <p className="status error">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="status">No workouts found.</p>
      )}

      <div className="card-grid">
        {items.map((workout) => (
          <article
            className="data-card"
            key={workout._id || workout.name}
          >
            <span className="card-kicker">
              {workout.category} / {workout.difficulty}
            </span>

            <h3>{workout.name}</h3>

            <p>{workout.coachNote}</p>

            <small>
              {workout.durationMinutes} min ·{' '}
              {workout.exercises?.length || 0} exercises
            </small>
          </article>
        ))}
      </div>
    </section>
  )
}
