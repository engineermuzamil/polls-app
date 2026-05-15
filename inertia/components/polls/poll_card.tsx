import { Link } from '@inertiajs/react'
import PollBadge from './poll_badge'
import type { PollData } from '~/types/poll'

interface PollCardProps {
  poll: PollData
  onDelete?: (slug: string) => void
  href?: string
  showVotes?: boolean
}

export default function PollCard({ poll, onDelete, href, showVotes = true }: PollCardProps) {
  const variant = poll.isTrashed ? 'trashed' : poll.expired ? 'expired' : 'active'
  const dimmed = poll.expired || poll.isTrashed

  const inner = (
    <div className="bg-[#141414] border border-white/7 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden transition-all hover:border-white/15 hover:bg-[#181818]">
      {/* Dynamic color accent bar — inline style required */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
        style={{ background: poll.pollColor, opacity: dimmed ? 0.35 : 0.9 }}
      />

      <div className="flex-1 min-w-0 pl-2">
        <div className="flex items-center gap-2 mb-1">
          <PollBadge variant={variant} />
        </div>
        <p
          className={`text-[15px] font-medium truncate ${dimmed ? 'text-white/50' : 'text-white'}`}
        >
          {poll.title}
        </p>
        <p className="text-xs text-white/30 mt-0.5">
          {poll.author?.fullName ?? 'Unknown'} ·{' '}
          {poll.expired ? `closed ${poll.closesAtRelative}` : `closes ${poll.closesAtRelative}`}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {showVotes && (
          <span className="text-[13px] text-white/30 whitespace-nowrap">
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
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 border border-white/8 text-white/30 text-sm transition-all hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 cursor-pointer"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {inner}
      </Link>
    )
  }

  return inner
}
