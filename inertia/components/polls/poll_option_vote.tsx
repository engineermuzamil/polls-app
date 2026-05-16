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
      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl border text-left transition-all ${
        disabled && !selected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${
        selected
          ? 'border-white/20'
          : 'bg-white/3 border-white/8 hover:border-white/20 hover:bg-white/5'
      }`}
      style={selected ? { background: `${pollColor}14`, borderColor: `${pollColor}50` } : undefined}
    >
      {/* Radio circle */}
      <span
        className="w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
        style={{
          borderColor: selected ? pollColor : 'rgba(255,255,255,0.2)',
        }}
      >
        {selected && (
          <span className="w-2 h-2 rounded-full block" style={{ background: pollColor }} />
        )}
      </span>

      <span className={`text-sm ${selected ? 'text-white' : 'text-white/70'}`}>{label}</span>
    </button>
  )
}
