import CollectionPage from './CollectionPage.jsx'
import { useCollection } from './useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const { items, loading, error } = useCollection(workoutsUrl)

  return (
    <CollectionPage title="Workouts" eyebrow="Find your next session" description="A little structure for whatever energy you have today." items={items} loading={loading} error={error}>
      <div className="tracker-table-wrap table-responsive">
        <table className="table tracker-table">
          <thead><tr><th>Workout</th><th>Type</th><th>Duration</th><th>Difficulty</th><th>Description</th></tr></thead>
          <tbody>
            {items.map((workout, index) => (
              <tr key={workout._id || workout.id || index}>
                <td className="tracker-primary-value">{workout.title || 'Workout'}</td>
                <td><span className="tracker-tag">{workout.type || 'Session'}</span></td>
                <td>{workout.durationMinutes ?? '—'} min</td>
                <td>{workout.difficulty || '—'}</td>
                <td>{workout.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}