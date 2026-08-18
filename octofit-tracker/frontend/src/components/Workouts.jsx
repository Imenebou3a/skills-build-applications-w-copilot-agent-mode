import { useEffect, useState } from 'react'
export default function Workouts() {
  const [items, setItems] = useState([])
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.data || data.results || data.items || []))
      .catch((error) => console.error('Workouts API error:', error))
  }, [endpoint])

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Workout library</h2>
        <span>{items.length} sessions</span>
      </div>

      <div className="card-grid">
        {items.map((workout) => (
          <article className="data-card" key={workout._id}>
            <span className="card-kicker">
              {workout.category} / {workout.difficulty}
            </span>
            <h3>{workout.name}</h3>
            <p>{workout.coachNote}</p>
            <small>
              {workout.durationMinutes} min · {workout.exercises?.length || 0}{' '}
              exercises
            </small>
          </article>
        ))}
      </div>
    </section>
  )
}
