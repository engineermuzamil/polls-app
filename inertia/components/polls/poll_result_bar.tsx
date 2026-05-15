interface PollResultBarProps {
  label: string
  votesCount: number
  percentage: number
  pollColor: string
  isUserVote: boolean
}

export default function PollResultBar({
  label,
  votesCount,
  percentage,
  pollColor,
  isUserVote,
}: PollResultBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1.5">
          {isUserVote && (
            <span className="text-[13px] font-semibold" style={{ color: pollColor }}>
              ✓
            </span>
          )}
          <span className={`text-sm ${isUserVote ? 'text-white font-medium' : 'text-white/70'}`}>
            {label}
          </span>
        </div>
        <span className="text-[13px] text-white/50 font-medium">{percentage.toFixed(1)}%</span>
      </div>

      {/* Bar track */}
      <div className="h-1.5 bg-white/7 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: isUserVote ? pollColor : `${pollColor}55`,
          }}
        />
      </div>

      <p className="text-xs text-white/25 mt-1">
        {votesCount} {votesCount === 1 ? 'vote' : 'votes'}
      </p>
    </div>
  )
}
