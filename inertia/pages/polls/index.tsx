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

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white p-12">
      <PageHeader
        userName={user?.fullName ?? user?.email}
        links={[{ label: 'Polls', href: '/polls', active: true }]}
      />

      <div className="mb-9">
        <h1 className="font-['Instrument_Serif',serif] text-[32px] tracking-tight mb-1">
          All Polls
        </h1>
        <p className="text-sm text-white/35">Browse open polls and cast your vote.</p>
      </div>

      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-3">
          Active
        </p>
        {activePolls.length === 0 ? (
          <p className="text-[13px] text-white/20 py-3">
            No active polls right now. Check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {activePolls.map((poll) => (
              <PollCard key={poll.slug} poll={poll} href={`/polls/${poll.slug}`} />
            ))}
          </div>
        )}
      </div>

      {closedPolls.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-3">
            Closed
          </p>
          <div className="flex flex-col gap-2">
            {closedPolls.map((poll) => (
              <PollCard key={poll.slug} poll={poll} href={`/polls/${poll.slug}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
