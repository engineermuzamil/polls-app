import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import type { PollData, OptionData } from '~/types/poll'
import PollBadge from '~/components/polls/poll_badge'
import PollResultBar from '~/components/polls/poll_result_bar'

type Props = InertiaProps<{
  poll: PollData
  options: OptionData[]
  totalVotes: number
}>

export default function PollResults() {
  const { poll, options, totalVotes } = usePage<Props>().props

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0c', color: '#fff', padding: '48px' }}>
      {/* Minimal header for public page */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 48,
          paddingBottom: 24,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 22,
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Polls
        </Link>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>Public results</span>
      </div>

      <div style={{ maxWidth: 600 }}>
        {/* Poll header */}
        <div
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '24px 28px',
            marginBottom: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: poll.pollColor,
              opacity: poll.expired ? 0.35 : 0.9,
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <PollBadge variant={poll.expired ? 'expired' : 'active'} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
              {poll.expired ? `closed ${poll.closesAtRelative}` : `closes ${poll.closesAtRelative}`}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: 26,
              letterSpacing: -0.5,
              marginBottom: 8,
            }}
          >
            {poll.title}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            by {poll.author?.fullName ?? 'Unknown'} · {totalVotes}{' '}
            {totalVotes === 1 ? 'vote' : 'votes'}
          </p>
        </div>

        {/* Results */}
        <div
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '24px 28px',
          }}
        >
          {options.map((opt) => (
            <PollResultBar
              key={opt.id}
              label={opt.label}
              votesCount={opt.votesCount}
              percentage={opt.percentage}
              pollColor={poll.pollColor}
              isUserVote={false}
            />
          ))}

          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              paddingTop: 14,
              marginTop: 8,
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
              {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
