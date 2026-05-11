import { POLL_COLORS } from '~/types/poll'

interface PollColorSwatchProps {
  value: string
  onChange: (color: string) => void
}

export default function PollColorSwatch({ value, onChange }: PollColorSwatchProps) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {POLL_COLORS.map((color) => (
        <button
          key={color.value}
          type="button"
          title={color.label}
          onClick={() => onChange(color.value)}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: color.value,
            border: value === color.value ? '2px solid #fff' : '2px solid transparent',
            outline: value === color.value ? `2px solid ${color.value}` : 'none',
            outlineOffset: 2,
            cursor: 'pointer',
            transition: 'all 0.15s',
            padding: 0,
          }}
        />
      ))}
    </div>
  )
}
