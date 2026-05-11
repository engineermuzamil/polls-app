type BadgeVariant = 'active' | 'expired' | 'trashed'

interface PollBadgeProps {
  variant: BadgeVariant
}

const config: Record<BadgeVariant, { label: string; style: React.CSSProperties }> = {
  active: {
    label: 'Open',
    style: {
      background: 'rgba(16,185,129,0.12)',
      border: '1px solid rgba(16,185,129,0.25)',
      color: '#6ee7b7',
    },
  },
  expired: {
    label: 'Closed',
    style: {
      background: 'rgba(107,114,128,0.12)',
      border: '1px solid rgba(107,114,128,0.25)',
      color: '#9ca3af',
    },
  },
  trashed: {
    label: 'Trashed',
    style: {
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.2)',
      color: '#fca5a5',
    },
  },
}

export default function PollBadge({ variant }: PollBadgeProps) {
  const { label, style } = config[variant]
  return (
    <span
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'currentColor',
          display: 'inline-block',
          opacity: variant === 'active' ? 1 : 0.6,
        }}
      />
      {label}
    </span>
  )
}
