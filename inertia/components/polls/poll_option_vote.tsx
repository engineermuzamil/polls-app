interface PollOptionVoteProps {
  id: number
  label: string
  selected: boolean
  disabled: boolean
  pollColor: string
  onClick: (id: number) => void
}

export default function PollOptionVote({
  id,
  label,
  selected,
  disabled,
  pollColor,
  onClick,
}: PollOptionVoteProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick(id)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '13px 16px',
        background: selected ? `${pollColor}14` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? pollColor + '50' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
        textAlign: 'left',
        opacity: disabled && !selected ? 0.5 : 1,
      }}
      className={!disabled ? 'hover:border-white/20 hover:bg-white/5' : ''}
    >
      {/* Radio circle */}
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: `2px solid ${selected ? pollColor : 'rgba(255,255,255,0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.15s',
        }}
      >
        {selected && (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: pollColor,
              display: 'block',
            }}
          />
        )}
      </span>

      <span style={{ fontSize: 14, color: selected ? '#fff' : 'rgba(255,255,255,0.7)' }}>
        {label}
      </span>
    </button>
  )
}
