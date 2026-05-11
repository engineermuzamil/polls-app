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
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isUserVote && <span style={{ color: pollColor, fontSize: 13, fontWeight: 600 }}>✓</span>}
          <span
            style={{
              fontSize: 14,
              color: isUserVote ? '#fff' : 'rgba(255,255,255,0.7)',
              fontWeight: isUserVote ? 500 : 400,
            }}
          >
            {label}
          </span>
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
          {percentage.toFixed(1)}%
        </span>
      </div>

      {/* Bar track */}
      <div
        style={{
          height: 6,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            background: isUserVote ? pollColor : `${pollColor}55`,
            borderRadius: 999,
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
        {votesCount} {votesCount === 1 ? 'vote' : 'votes'}
      </p>
    </div>
  )
}
