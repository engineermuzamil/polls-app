import { Link, useForm, usePage } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import type { PollData } from '~/types/poll'
import PageHeader from '~/components/page_header'
import PollCard from '~/components/polls/poll_card'

type Props = InertiaProps<{
  activePolls: PollData[]
  expiredPolls: PollData[]
  trashedCount: number
}>

export default function AdminDashboard() {
  const { activePolls, expiredPolls, trashedCount, user } = usePage<Props>().props
  const deleteForm = useForm({})

  function handleDelete(slug: string) {
    if (!confirm('Move this poll to trash?')) return
    deleteForm.delete(`/admin/polls/${slug}`)
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white p-12">
      <PageHeader
        userName={user?.fullName ?? user?.email}
        titleHref={null}
        links={[
          { label: `Trash (${trashedCount})`, href: '/admin/polls/trash' },
          { label: '+ Create Poll', href: '/admin/polls/create', variant: 'primary' },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 max-w-[520px] mb-12">
        {[
          { label: 'Active', value: activePolls.length, color: 'text-indigo-400' },
          { label: 'Expired', value: expiredPolls.length, color: 'text-amber-400' },
          { label: 'Trashed', value: trashedCount, color: 'text-zinc-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#141414] border border-white/8 rounded-xl p-5">
            <div className={`text-[26px] font-semibold mb-0.5 ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-white/30">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Active */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-3">
          Active
        </p>
        {activePolls.length === 0 ? (
          <p className="text-[13px] text-white/20 py-3">
            No active polls.{' '}
            <Link
              href="/admin/polls/create"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Create one →
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {activePolls.map((poll) => (
              <PollCard
                key={poll.slug}
                poll={poll}
                href={`/polls/${poll.slug}`}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Expired */}
      {expiredPolls.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-3">
            Expired
          </p>
          <div className="flex flex-col gap-2">
            {expiredPolls.map((poll) => (
              <PollCard
                key={poll.slug}
                poll={poll}
                href={`/polls/${poll.slug}`}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
