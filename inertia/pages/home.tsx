import { Link } from '@inertiajs/react'

export default function Home() {
  return (
    <div className="home-root">
      <nav className="home-nav">
        <span className="home-logo">Polls</span>
        <div className="home-nav-links">
          <Link href="/login" className="btn-ghost">
            Login
          </Link>
          <Link href="/register" className="btn-primary-nav">
            Get started
          </Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Live voting · Real-time results
        </div>

        <h1 className="hero-heading">
          Opinions that
          <br />
          <em>actually count</em>
        </h1>

        <p className="hero-sub">
          Create polls in seconds, share them with your team, and watch results come in live.
        </p>

        <div className="hero-actions">
          <Link href="/register" className="btn-hero-primary">
            Create your first poll →
          </Link>
          <Link href="/login" className="btn-hero-secondary">
            Sign in
          </Link>
        </div>
      </section>

      <div className="features-section">
        <div className="feature-item">
          <div className="feature-icon feature-icon-primary">🗳️</div>
          <div className="feature-title">Create polls instantly</div>
          <div className="feature-desc">
            Add a question, set options, pick a close date. Done in under a minute.
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon feature-icon-success">⚡</div>
          <div className="feature-title">Single-vote integrity</div>
          <div className="feature-desc">
            Each voter gets exactly one vote. No duplicates, no manipulation.
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon feature-icon-warn">📊</div>
          <div className="feature-title">Live results</div>
          <div className="feature-desc">
            Results update the moment votes come in. Share a public link anytime.
          </div>
        </div>
      </div>

      <footer className="home-footer">© {new Date().getFullYear()} Polls. Built with Polls App.</footer>
    </div>
  )
}
