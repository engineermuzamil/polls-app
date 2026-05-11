import { Link, useForm, usePage } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import type { PollData } from '~/types/poll'
import PageHeader from '~/components/page_header'
import FlashMessage from '~/components/flash_message'
import PollCard from '~/components/polls/poll_card'

type Props = InertiaProps<{
  activePolls: PollData[]
  expiredPolls: PollData[]
  trashedCount: number
}>

export default function AdminDashboard() {
  const { activePolls, expiredPolls, trashedCount, user, flash } = usePage<Props>().props

  const deleteForm = useForm({})

  function handleDelete(slug: string) {
    if (!confirm('Move this poll to trash?')) return
    deleteForm.delete(`/admin/polls/${slug}`)
  }

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.25)',
    marginBottom: 12,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0c', color: '#fff', padding: '48px' }}>
      <PageHeader
        userName={user?.fullName ?? user?.email}
        links={[
          { label: `Trash (${trashedCount})`, href: '/admin/polls/trash' },
          { label: '+ Create Poll', href: '/admin/polls/create', variant: 'primary' },
        ]}
      />

      <FlashMessage flash={flash} />

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 12,
          maxWidth: 520,
          marginBottom: 48,
        }}
      >
        {[
          { label: 'Active', value: activePolls.length, color: '#6366f1' },
          { label: 'Expired', value: expiredPolls.length, color: '#f59e0b' },
          { label: 'Trashed', value: trashedCount, color: '#6b7280' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              padding: '16px 20px',
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 600, color: stat.color, marginBottom: 2 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Active polls */}
      <div style={{ marginBottom: 40 }}>
        <p style={sectionLabel}>Active</p>
        {activePolls.length === 0 ? (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', padding: '12px 0' }}>
            No active polls.{' '}
            <Link href="/admin/polls/create" style={{ color: '#6366f1' }}>
              Create one →
            </Link>
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {activePolls.map((poll) => (
              <PollCard
                key={poll.slug}
                poll={poll}
                href={`/polls/${poll.slug}`}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Expired polls */}
      {expiredPolls.length > 0 && (
        <div>
          <p style={sectionLabel}>Expired</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {expiredPolls.map((poll) => (
              <PollCard
                key={poll.slug}
                poll={poll}
                href={`/polls/${poll.slug}`}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
