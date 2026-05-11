import { useForm, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import type { InertiaProps } from '~/types'
import type { PollData, OptionData } from '~/types/poll'
import PageHeader from '~/components/page_header'
import PollBadge from '~/components/polls/poll_badge'
import PollOptionVote from '~/components/polls/poll_option_vote'
import PollResultBar from '~/components/polls/poll_result_bar'

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
    <div style={{ minHeight: '100vh', background: '#0c0c0c', color: '#fff', padding: '48px' }}>
      <PageHeader
        userName={user?.fullName ?? user?.email}
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

      <div style={{ maxWidth: 600 }}>
        {/* Poll header card */}
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: poll.pollColor,
                  display: 'inline-block',
                  opacity: poll.expired ? 0.4 : 1,
                }}
              />
              <PollBadge variant={poll.expired ? 'expired' : 'active'} />
            </div>
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
              lineHeight: 1.2,
            }}
          >
            {poll.title}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            by {poll.author?.fullName ?? 'Unknown'} · {totalVotes}{' '}
            {totalVotes === 1 ? 'vote' : 'votes'} so far
          </p>
        </div>

        {/* Voting */}
        {canVote && (
          <div
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '24px 28px',
              marginBottom: 16,
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
              Select one option to cast your vote
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 12 }}>
              Click an option to vote — no submit button needed
            </p>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '24px 28px',
              marginBottom: 16,
            }}
          >
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

            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                paddingTop: 14,
                marginTop: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
                {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
                {effectiveVoteId && !isAdmin && (
                  <span>
                    {' '}
                    · you voted for{' '}
                    <strong style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {options.find((o) => o.id === effectiveVoteId)?.label}
                    </strong>
                  </span>
                )}
              </p>
              {isAdmin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
                    You created this poll
                  </span>
                  <button
                    onClick={handleDelete}
                    disabled={deleteForm.processing}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 7,
                      color: '#fca5a5',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 0.15s',
                    }}
                    className="hover:bg-red-500/15"
                  >
                    Delete poll
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
