import CollectionPage from './CollectionPage.jsx'
import { useCollection } from './useCollection.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const { items, loading, error } = useCollection(usersUrl)

  return (
    <CollectionPage title="People" eyebrow="The community" description="The people behind every lap, lift, and stretch." items={items} loading={loading} error={error}>
      <div className="tracker-table-wrap table-responsive">
        <table className="table tracker-table">
          <thead><tr><th>Name</th><th>Email</th><th>Age</th><th>Team</th></tr></thead>
          <tbody>
            {items.map((user, index) => (
              <tr key={user._id || user.id || index}>
                <td className="tracker-primary-value">{user.name || 'Member'}</td>
                <td>{user.email || '—'}</td>
                <td>{user.age ?? '—'}</td>
                <td>{user.team?.name || (user.team ? 'Team member' : 'Unassigned')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionPage>
  )
}