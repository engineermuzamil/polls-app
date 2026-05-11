import { Link } from '@inertiajs/react'
import PollBadge from './poll_badge'
import type { PollData } from '~/types/poll'

interface PollCardProps {
  poll: PollData
  /** If provided, renders a soft-delete button on the right */
  onDelete?: (slug: string) => void
  /** Link to navigate to when card is clicked */
  href?: string
  /** Show vote count */
  showVotes?: boolean
}

export default function PollCard({ poll, onDelete, href, showVotes = true }: PollCardProps) {
  const variant = poll.isTrashed ? 'trashed' : poll.expired ? 'expired' : 'active'

  const inner = (
    <div
      style={{
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transition: 'border-color 0.15s, background 0.15s',
        cursor: href ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="hover:border-white/15 hover:bg-[#181818]"
    >
      {/* Color accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: poll.pollColor,
          borderRadius: '12px 0 0 12px',
          opacity: poll.expired || poll.isTrashed ? 0.35 : 0.9,
        }}
      />

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, paddingLeft: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <PollBadge variant={variant} />
        </div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: poll.expired || poll.isTrashed ? 'rgba(255,255,255,0.5)' : '#fff',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {poll.title}
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
          {poll.author?.fullName ?? 'Unknown'} ·{' '}
          {poll.expired ? `closed ${poll.closesAtRelative}` : `closes ${poll.closesAtRelative}`}
        </p>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {showVotes && (
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
            {poll.votesCount} {poll.votesCount === 1 ? 'vote' : 'votes'}
          </span>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete(poll.slug)
            }}
            title="Move to trash"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.3)',
              borderRadius: 6,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 14,
              transition: 'all 0.15s',
            }}
            className="hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
        {inner}
      </Link>
    )
  }

  return inner
}
