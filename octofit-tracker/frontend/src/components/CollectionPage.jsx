export default function CollectionPage({ title, eyebrow, description, items, loading, error, children }) {
  return (
    <section>
      <header className="tracker-page-heading">
        <div>
          <p className="tracker-eyebrow">{eyebrow}</p>
          <h1 className="tracker-page-title">{title}</h1>
          <p className="tracker-page-description">{description}</p>
        </div>
        {!loading && !error && <span className="tracker-count">{items.length}</span>}
      </header>
      {loading ? (
        <div className="tracker-feedback" role="status">Loading {title.toLowerCase()}...</div>
      ) : error ? (
        <div className="tracker-feedback tracker-feedback-error" role="alert">
          <p>Could not load {title.toLowerCase()}: {error}</p>
        </div>
      ) : items.length === 0 ? (
        <div className="tracker-feedback" role="status">No {title.toLowerCase()} to show yet.</div>
      ) : (
        children
      )}
    </section>
  )
}