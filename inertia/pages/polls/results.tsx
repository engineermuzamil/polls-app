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
    <div className="min-h-screen bg-[#0c0c0c] text-white p-12">
      {/* Minimal public header */}
      <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/8">
        <Link href="/" className="font-['Instrument_Serif',serif] text-[22px] text-white">
          Polls
        </Link>
        <span className="text-[13px] text-white/25">Public results</span>
      </div>

      <div className="max-w-[600px]">
        {/* Poll header */}
        <div className="bg-[#141414] border border-white/8 rounded-2xl p-7 mb-4 relative overflow-hidden">
          {/* Dynamic color accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
            style={{ background: poll.pollColor, opacity: poll.expired ? 0.35 : 0.9 }}
          />

          <div className="flex justify-between mb-3">
            <PollBadge variant={poll.expired ? 'expired' : 'active'} />
            <span className="text-xs text-white/30">
              {poll.expired ? `closed ${poll.closesAtRelative}` : `closes ${poll.closesAtRelative}`}
            </span>
          </div>

          <h1 className="font-['Instrument_Serif',serif] text-[26px] tracking-tight mb-2">
            {poll.title}
          </h1>
          <p className="text-[13px] text-white/35">
            by {poll.author?.fullName ?? 'Unknown'} · {totalVotes}{' '}
            {totalVotes === 1 ? 'vote' : 'votes'}
          </p>
        </div>

        {/* Results */}
        <div className="bg-[#141414] border border-white/8 rounded-2xl p-7">
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
          <div className="border-t border-white/7 pt-3.5 mt-2">
            <p className="text-[13px] text-white/30">
              {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
