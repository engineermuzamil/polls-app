interface FlashMessageProps {
  flash?: { success?: string; error?: string }
}

export default function FlashMessage({ flash }: FlashMessageProps) {
  if (!flash?.success && !flash?.error) return null

  const isSuccess = !!flash.success
  const message = flash.success ?? flash.error

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
        borderRadius: 10,
        marginBottom: 28,
        fontSize: 14,
        fontWeight: 500,
        background: isSuccess ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
        border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        color: isSuccess ? '#6ee7b7' : '#fca5a5',
      }}
    >
      <span>{isSuccess ? '✓' : '✕'}</span>
      {message}
    </div>
  )
}
