import { useEffect, useState } from 'react'
export default function Teams() {
  const [items, setItems] = useState([])
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.data || data.results || data.items || []))
      .catch((error) => console.error('Teams API error:', error))
  }, [endpoint])

  return (
    <section className="collection">
      <div className="section-heading">
        <h2>Teams</h2>
        <span>{items.length} squads</span>
      </div>

      <div className="card-grid">
        {items.map((team) => (
          <article className="data-card" key={team._id}>
            <span className="card-kicker">
              TEAM / {team.memberIds?.length || 0} MEMBERS
            </span>
            <h3>{team.name}</h3>
            <p>{team.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
