import { usePage } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import type { PollData } from '~/types/poll'
import PageHeader from '~/components/page_header'
import PollCard from '~/components/polls/poll_card'

type Props = InertiaProps<{
  activePolls: PollData[]
  closedPolls: PollData[]
}>

export default function PollsIndex() {
  const { activePolls, closedPolls, user } = usePage<Props>().props

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
        links={[{ label: 'Polls', href: '/polls', active: true }]}
      />

      <div style={{ marginBottom: 36 }}>
        <h1
          style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 32,
            letterSpacing: -0.8,
            marginBottom: 4,
          }}
        >
          All Polls
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
          Browse open polls and cast your vote.
        </p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <p style={sectionLabel}>Active</p>
        {activePolls.length === 0 ? (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', padding: '12px 0' }}>
            No active polls right now. Check back soon.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {activePolls.map((poll) => (
              <PollCard key={poll.slug} poll={poll} href={`/polls/${poll.slug}`} />
            ))}
          </div>
        )}
      </div>

      {closedPolls.length > 0 && (
        <div>
          <p style={sectionLabel}>Closed</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {closedPolls.map((poll) => (
              <PollCard key={poll.slug} poll={poll} href={`/polls/${poll.slug}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
