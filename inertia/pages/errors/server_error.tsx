import { Link } from '@inertiajs/react'

export default function ServerError() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0c0c0c',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow — red tint for errors */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Link
        href="/"
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 20,
          color: 'rgba(255,255,255,0.35)',
          textDecoration: 'none',
          marginBottom: 56,
          display: 'block',
        }}
      >
        Polls
      </Link>

      <p
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 'clamp(80px, 18vw, 160px)',
          color: 'rgba(255,255,255,0.05)',
          lineHeight: 1,
          letterSpacing: -6,
          marginBottom: 0,
          userSelect: 'none',
        }}
      >
        500
      </p>

      <h1
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 'clamp(22px, 4vw, 32px)',
          color: '#fff',
          letterSpacing: -0.5,
          marginBottom: 10,
          marginTop: -12,
        }}
      >
        Something went wrong
      </h1>

      <p
        style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.35)',
          fontWeight: 300,
          maxWidth: 340,
          lineHeight: 1.6,
          marginBottom: 36,
        }}
      >
        An unexpected error occurred on the server. Try refreshing the page or come back in a
        moment.
      </p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 22px',
            background: '#6366f1',
            color: '#fff',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Refresh page
        </button>
        <Link
          href="/"
          style={{
            padding: '10px 22px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.45)',
            borderRadius: 8,
            fontSize: 14,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
