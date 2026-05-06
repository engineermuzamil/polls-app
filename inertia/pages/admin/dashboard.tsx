import { Data } from '@generated/data'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

export default function AdminDashboard() {
  const { user, flash } = usePage<Data.SharedProps>().props

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0c', color: '#fff', padding: '48px' }}>
      {/* Flash message */}
      {flash?.success && (
        <div
          style={{
            background: 'rgba(0,166,62,0.1)',
            border: '1px solid #00a63e',
            color: '#00a63e',
            borderRadius: 8,
            padding: '12px 16px',
            marginBottom: 32,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {flash.success}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: 24,
        }}
      >
        <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22 }}>Polls</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            {user?.fullName ?? user?.email}
          </span>
          <Link
            href="/logout"
            method="post"
            as="button"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Sign out
          </Link>
        </div>
      </div>

      <h1
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 36,
          letterSpacing: -1,
          marginBottom: 8,
        }}
      >
        Admin Dashboard
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 40 }}>
        Manage polls, review results, and control the trash.
      </p>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 640 }}
      >
        {[
          { label: 'Active polls', value: '—', color: '#6366f1' },
          { label: 'Expired polls', value: '—', color: '#f59e0b' },
          { label: 'Trashed', value: '—', color: '#6b7280' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '20px 24px',
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 48, fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
        Full dashboard UI is coming in feature/4-admin-ui.
      </p>
    </div>
  )
}
