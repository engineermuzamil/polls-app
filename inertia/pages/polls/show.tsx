import { useForm, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import type { InertiaProps } from '~/types'
import type { PollData, OptionData } from '~/types/poll'
import PageHeader from '~/components/page_header'
import PollBadge from '~/components/polls/poll_badge'
import PollOptionVote from '~/components/polls/poll_option_vote'
import PollResultBar from '~/components/polls/poll_result_bar'
import { Button } from '@/components/ui/button'

type Props = InertiaProps<{
  poll: PollData
  options: OptionData[]
  hasVoted: boolean
  userVoteOptionId: number | null
  totalVotes: number
  isAdmin: boolean
}>

export default function PollShow() {
  const { poll, options, hasVoted, userVoteOptionId, totalVotes, isAdmin, user } =
    usePage<Props>().props

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [voting, setVoting] = useState(false)
  const deleteForm = useForm({})

  function handleVote(optionId: number) {
    if (voting) return
    setSelectedId(optionId)
    setVoting(true)
    router.post(
      `/polls/${poll.slug}/vote`,
      { poll_option_id: optionId },
      {
        onError: () => {
          setSelectedId(null)
          setVoting(false)
        },
        onFinish: () => setVoting(false),
      }
    )
  }

  function handleDelete() {
    if (!confirm('Move this poll to trash?')) return
    deleteForm.delete(`/admin/polls/${poll.slug}`, {
      onSuccess: () => (window.location.href = '/admin'),
    })
  }

  const showResults = hasVoted || poll.expired || isAdmin
  const canVote = !hasVoted && !poll.expired && !isAdmin
  const effectiveVoteId = userVoteOptionId ?? selectedId

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white p-12">
      <PageHeader
        userName={user?.fullName ?? user?.email}
        titleHref={null}
        links={
          isAdmin
            ? [
                { label: 'Dashboard', href: '/admin' },
                { label: 'Trash', href: '/admin/polls/trash' },
                { label: '+ Create Poll', href: '/admin/polls/create', variant: 'primary' },
              ]
            : [{ label: 'Polls', href: '/polls' }]
        }
      />

      <div className="max-w-[600px]">
        {/* Poll header card */}
        <div className="bg-[#141414] border border-white/8 rounded-2xl p-7 mb-4 relative overflow-hidden">
          {/* Dynamic color accent bar — inline style required for hex value */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-opacity"
            style={{ background: poll.pollColor, opacity: poll.expired ? 0.35 : 0.9 }}
          />

          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              {/* Dynamic color dot */}
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ background: poll.pollColor, opacity: poll.expired ? 0.4 : 1 }}
              />
              <PollBadge variant={poll.expired ? 'expired' : 'active'} />
            </div>
            <span className="text-xs text-white/30">
              {poll.expired ? `closed ${poll.closesAtRelative}` : `closes ${poll.closesAtRelative}`}
            </span>
          </div>

          <h1 className="font-['Instrument_Serif',serif] text-[26px] tracking-tight leading-snug mb-2">
            {poll.title}
          </h1>
          <p className="text-[13px] text-white/35">
            by {poll.author?.fullName ?? 'Unknown'} · {totalVotes}{' '}
            {totalVotes === 1 ? 'vote' : 'votes'} so far
          </p>
        </div>

        {/* Voting */}
        {canVote && (
          <div className="bg-[#141414] border border-white/8 rounded-2xl p-7 mb-4">
            <p className="text-[13px] text-white/40 mb-3.5">Select one option to cast your vote</p>
            <div className="flex flex-col gap-2">
              {options.map((opt) => (
                <PollOptionVote
                  key={opt.id}
                  id={opt.id}
                  label={opt.label}
                  selected={selectedId === opt.id}
                  disabled={voting}
                  pollColor={poll.pollColor}
                  onClick={handleVote}
                />
              ))}
            </div>
            <p className="text-xs text-white/20 mt-3">
              Click an option to vote — no submit button needed
            </p>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="bg-[#141414] border border-white/8 rounded-2xl p-7 mb-4">
            {options.map((opt) => (
              <PollResultBar
                key={opt.id}
                label={opt.label}
                votesCount={opt.votesCount}
                percentage={opt.percentage}
                pollColor={poll.pollColor}
                isUserVote={effectiveVoteId === opt.id}
              />
            ))}

            <div className="border-t border-white/7 pt-3.5 mt-2 flex justify-between items-center">
              <p className="text-[13px] text-white/30">
                {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
                {effectiveVoteId && !isAdmin && (
                  <span>
                    {' '}
                    · you voted for{' '}
                    <strong className="text-white/60">
                      {options.find((o) => o.id === effectiveVoteId)?.label}
                    </strong>
                  </span>
                )}
              </p>
              {isAdmin && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/25">You created this poll</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleteForm.processing}
                    className="bg-red-500/8 border-red-500/20 text-red-300 hover:bg-red-500/15 hover:border-red-500/35 transition-colors"
                  >
                    Delete poll
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
