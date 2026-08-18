import { displayName, useApi } from '../api.js'

export default function Activities() {
  const { items, loading, error } = useApi('activities')
  return <Collection title="Activity feed" count={items.length} loading={loading} error={error}><div className="activity-list">{items.map((activity) => <article className="list-row" key={activity._id || `${activity.type}-${activity.completedAt}`}><span className="row-mark">{activity.type?.slice(0, 2).toUpperCase()}</span><div><strong>{activity.type}</strong><small>{displayName(activity.userId)} · {activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Date pending'}</small></div><b>{activity.durationMinutes} min</b><b>{activity.calories} kcal</b></article>)}</div></Collection>
}

function Collection({ title, count, loading, error, children }) { return <section className="collection"><div className="section-heading"><h2>{title}</h2><span>{count} records</span></div>{loading && <p className="status">Loading data...</p>}{error && <p className="status error">{error}. Check the API server and `VITE_CODESPACE_NAME`.</p>}{!loading && !error && count === 0 && <p className="status">No records found.</p>}{children}</section> }