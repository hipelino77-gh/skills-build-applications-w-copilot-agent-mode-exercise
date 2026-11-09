import CollectionPage from './CollectionPage.jsx'
import { useCollection } from './useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const { items, loading, error } = useCollection(teamsUrl)

  return (
    <CollectionPage title="Teams" eyebrow="Better in a pack" description="Meet the crews making room for more movement." items={items} loading={loading} error={error}>
      <div className="tracker-table-wrap table-responsive">
        <table className="table tracker-table">
          <thead><tr><th>Team</th><th>About</th><th>Members</th><th>Points</th></tr></thead>
          <tbody>
            {items.map((team, index) => (
              <tr key={team._id || team.id || index}>
                <td className="tracker-primary-value">{team.name || 'Team'}</td>
                <td>{team.description || 'A team on the move.'}</td>
                <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                <td className="tracker-primary-value">{team.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}