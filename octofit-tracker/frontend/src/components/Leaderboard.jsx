import CollectionPage from './CollectionPage.jsx'
import { useCollection } from './useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const { items, loading, error } = useCollection(leaderboardUrl)
  const entries = [...items].sort((first, second) => (first.rank ?? Infinity) - (second.rank ?? Infinity))

  return (
    <CollectionPage title="Leaderboard" eyebrow="Friendly competition" description="Celebrate consistency, effort, and the points earned together." items={items} loading={loading} error={error}>
      <div className="tracker-table-wrap table-responsive">
        <table className="table tracker-table">
          <thead><tr><th>Rank</th><th>Member</th><th>Team</th><th>Period</th><th>Points</th></tr></thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id || entry.id || index}>
                <td><span className="tracker-rank">{entry.rank ?? index + 1}</span></td>
                <td className="tracker-primary-value">{entry.user?.name || 'Member'}</td>
                <td>{entry.team?.name || 'Team'}</td>
                <td>{entry.period || 'Current'}</td>
                <td className="tracker-primary-value">{entry.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}