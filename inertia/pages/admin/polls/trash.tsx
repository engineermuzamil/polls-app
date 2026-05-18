import { useForm, usePage } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import type { PollData } from '~/types/poll'
import PageHeader from '~/components/page_header'
import { Button } from '@/components/ui/button'

type Props = InertiaProps<{ trashedPolls: PollData[] }>

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
    <div className="min-h-screen bg-[#0c0c0c] text-white p-12">
      <PageHeader
        userName={user?.fullName ?? user?.email}
        titleHref={null}
        links={[
          { label: 'Dashboard', href: '/admin' },
          { label: '+ Create Poll', href: '/admin/polls/create', variant: 'primary' },
        ]}
      />

      <div className="mb-8">
        <h1 className="font-['Instrument_Serif',serif] text-[32px] tracking-tight mb-1.5">Trash</h1>
        <p className="text-sm text-white/35">
          Polls moved to trash. Restore to bring them back, or permanently delete them.
        </p>
      </div>

      {trashedPolls.length === 0 ? (
        <div className="bg-[#141414] border border-white/7 rounded-xl p-8 text-center text-sm text-white/25">
          Trash is empty.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {trashedPolls.map((poll) => (
            <div
              key={poll.slug}
              className="bg-[#141414] border border-white/7 rounded-xl p-5 flex items-center gap-4 relative overflow-hidden"
            >
              {/* Color bar — dynamic hex, inline style required */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl opacity-30"
                style={{ background: poll.pollColor }}
              />

              <div className="flex-1 min-w-0 pl-2">
                <p className="text-[15px] font-medium text-white/45 line-through truncate mb-1">
                  {poll.title}
                </p>
                <p className="text-xs text-white/20">
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

              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestore(poll.slug)}
                  disabled={restoreForm.processing}
                  className="bg-indigo-500/10 border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-colors"
                >
                  Restore
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleForceDelete(poll.slug)}
                  disabled={deleteForm.processing}
                  className="bg-red-500/8 border-red-500/20 text-red-300 hover:bg-red-500/15 hover:border-red-500/35 transition-colors"
                >
                  Delete permanently
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
