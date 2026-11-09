import { NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

const sections = [
  { path: '/', label: 'Overview' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="border-bottom bg-white">
        <div className="container d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 py-3">
          <div className="d-flex align-items-center gap-2">
            <img src={octofitLogo} alt="" width="44" height="44" />
            <span className="fs-4 fw-semibold">OctoFit Tracker</span>
          </div>
          <nav className="nav nav-underline flex-wrap ms-md-auto" aria-label="Main navigation">
            {sections.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          {sections.map(({ path, label }) => (
            <Route key={path} path={path} element={<h1 className="h3">{label}</h1>} />
          ))}
          <Route path="*" element={<h1 className="h3">Not found</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
