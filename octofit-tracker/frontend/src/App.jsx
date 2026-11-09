import { NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/users', label: 'People' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="tracker-shell">
      <header className="tracker-header">
        <div className="container-xxl d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 py-3">
          <div className="d-flex align-items-center gap-3">
            <img className="tracker-logo" src={octofitLogo} alt="" width="46" height="46" />
            <div>
              <span className="tracker-brand">OctoFit</span>
              <span className="tracker-brand-subtitle"> / TEAM TRACKER</span>
            </div>
          </div>
          <nav className="tracker-nav ms-lg-auto" aria-label="Main navigation">
            {sections.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `tracker-nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container-xxl tracker-main py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<h1 className="h3">Page not found</h1>} />
        </Routes>
      </main>
      <footer className="tracker-footer">
        <div className="container-xxl d-flex justify-content-between gap-3 py-3">
          <span>Move together. Get stronger.</span>
          <span>OCTOFIT TRACKER</span>
        </div>
      </footer>
    </div>
  )
}

export default App
