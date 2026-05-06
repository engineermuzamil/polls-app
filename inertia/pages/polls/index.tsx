import { Data } from '@generated/data'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function PollsIndex() {
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

      {/* Header */}
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
          <Button
            asChild
            variant="outline"
            size="sm"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer',
              height: 'auto',
              padding: '8px 16px',
            }}
            className="hover:text-white hover:bg-white/10"
          >
            <Link href="/logout" method="post" as="button">
              Sign out
            </Link>
          </Button>
        </div>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 36,
          letterSpacing: -1,
          marginBottom: 8,
        }}
      >
        Active Polls
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 40 }}>
        Browse open polls and cast your vote.
      </p>

      {/* Placeholder card */}
      <Card
        style={{
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          maxWidth: 480,
        }}
      >
        <CardContent style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 13, color: '#6ee7b7', fontWeight: 500 }}>
              Polls loading soon
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
            The full voter UI is coming in feature/6-voter-ui. You're successfully logged in as a
            voter — auth is working.
          </p>
        </CardContent>
      </Card>

      <p style={{ marginTop: 48, fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
        Signed in as <strong style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.email}</strong> ·
        role: <strong style={{ color: '#6ee7b7' }}>voter</strong>
      </p>
    </div>
  )
}
