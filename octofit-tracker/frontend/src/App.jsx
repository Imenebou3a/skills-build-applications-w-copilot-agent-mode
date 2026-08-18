import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const links = [['/', 'Overview'], ['activities', 'Activities'], ['leaderboard', 'Leaderboard'], ['teams', 'Teams'], ['users', 'Users'], ['workouts', 'Workouts']]
  return <div className="app-shell">
    <header className="topbar"><NavLink className="brand" to="/">Octofit <span>TRACKER</span></NavLink><nav aria-label="Main navigation">{links.map(([path, label]) => <NavLink key={label} end={path === '/'} to={path === '/' ? path : `/${path}`}>{label}</NavLink>)}</nav></header>
    <main className="content"><section className="page-intro"><p className="eyebrow">PERSONAL PERFORMANCE / 2026</p><h1>Train with intent.</h1><p className="intro-copy">Your team, activity, and next best workout in one clear view.</p></section>
      <Routes><Route path="/" element={<Activities />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes>
    </main>
  </div>
}

export default App
