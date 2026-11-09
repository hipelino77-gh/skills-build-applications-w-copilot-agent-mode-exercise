import CollectionPage from './CollectionPage.jsx'
import { useCollection } from './useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleDateString()
}

export default function Activities() {
  const { items, loading, error } = useCollection(activitiesUrl)

  return (
    <CollectionPage title="Activities" eyebrow="The movement log" description="A shared view of the work everyone is putting in." items={items} loading={loading} error={error}>
      <div className="tracker-table-wrap table-responsive">
        <table className="table tracker-table">
          <thead><tr><th>Activity</th><th>Date</th><th>Duration</th><th>Distance</th><th>Calories</th></tr></thead>
          <tbody>
            {items.map((activity, index) => (
              <tr key={activity._id || activity.id || index}>
                <td><span className="tracker-tag">{activity.type || 'Activity'}</span></td>
                <td>{formatDate(activity.date)}</td>
                <td>{activity.durationMinutes ?? '—'} min</td>
                <td>{activity.distanceKm == null ? '—' : `${activity.distanceKm} km`}</td>
                <td className="tracker-primary-value">{activity.caloriesBurned ?? '—'} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}