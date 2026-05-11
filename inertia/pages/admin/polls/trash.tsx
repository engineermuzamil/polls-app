import { useForm, usePage } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import type { PollData } from '~/types/poll'
import PageHeader from '~/components/page_header'

type Props = InertiaProps<{
  trashedPolls: PollData[]
}>

export default function PollsTrash() {
  const { trashedPolls, user } = usePage<Props>().props

  const restoreForm = useForm({})
  const deleteForm = useForm({})

  function handleRestore(slug: string) {
    restoreForm.patch(`/admin/polls/${slug}/restore`)
  }

  function handleForceDelete(slug: string) {
    if (!confirm('Permanently delete this poll? This cannot be undone.')) return
    deleteForm.delete(`/admin/polls/${slug}/force`)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0c', color: '#fff', padding: '48px' }}>
      <PageHeader
        userName={user?.fullName ?? user?.email}
        links={[{ label: '+ Create Poll', href: '/admin/polls/create', variant: 'primary' }]}
      />

      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 32,
            letterSpacing: -0.8,
            marginBottom: 6,
          }}
        >
          Trash
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
          Polls moved to trash. Restore to bring them back, or permanently delete them.
        </p>
      </div>

      {trashedPolls.length === 0 ? (
        <div
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            padding: '32px',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.25)',
            fontSize: 14,
          }}
        >
          Trash is empty.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {trashedPolls.map((poll) => (
            <div
              key={poll.slug}
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
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
                  opacity: 0.3,
                  borderRadius: '12px 0 0 12px',
                }}
              />

              <div style={{ flex: 1, minWidth: 0, paddingLeft: 8 }}>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'line-through',
                    marginBottom: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {poll.title}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
                  Deleted{' '}
                  {poll.deletedAt
                    ? new Date(poll.deletedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '—'}{' '}
                  · {poll.votesCount} {poll.votesCount === 1 ? 'vote' : 'votes'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => handleRestore(poll.slug)}
                  disabled={restoreForm.processing}
                  style={{
                    padding: '7px 14px',
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    borderRadius: 7,
                    color: '#a5b4fc',
                    fontSize: 13,
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                  className="hover:bg-indigo-500/20"
                >
                  Restore
                </button>
                <button
                  onClick={() => handleForceDelete(poll.slug)}
                  disabled={deleteForm.processing}
                  style={{
                    padding: '7px 14px',
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
                  Delete permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
