type BadgeVariant = 'active' | 'expired' | 'trashed'

const config: Record<BadgeVariant, { label: string; className: string; dotClass: string }> = {
  active: {
    label: 'Open',
    className: 'bg-emerald-500/12 border border-emerald-500/25 text-emerald-300',
    dotClass: 'bg-emerald-400',
  },
  expired: {
    label: 'Closed',
    className: 'bg-zinc-500/12 border border-zinc-500/25 text-zinc-400',
    dotClass: 'bg-zinc-400 opacity-60',
  },
  trashed: {
    label: 'Trashed',
    className: 'bg-red-500/10 border border-red-500/20 text-red-300',
    dotClass: 'bg-red-400 opacity-60',
  },
}

export default function PollBadge({ variant }: { variant: BadgeVariant }) {
  const { label, className, dotClass } = config[variant]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${dotClass}`} />
      {label}
    </span>
  )
}
