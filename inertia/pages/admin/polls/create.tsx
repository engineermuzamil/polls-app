import { useForm, usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import { POLL_COLORS } from '~/types/poll'
import PageHeader from '~/components/page_header'
import PollColorSwatch from '~/components/polls/poll_color_swatch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = InertiaProps<Record<string, never>>

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 500,
  color: 'rgba(255,255,255,0.45)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  marginBottom: 8,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '10px 14px',
  fontSize: 14,
  color: '#fff',
  height: 40,
  outline: 'none',
}

export default function CreatePoll() {
  const { user } = usePage<Props>().props

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    pollColor: POLL_COLORS[0].value,
    closesAt: '',
    options: ['', ''],
  })

  function addOption() {
    if (data.options.length >= 10) return
    setData('options', [...data.options, ''])
  }

  function removeOption(index: number) {
    if (data.options.length <= 2) return
    setData(
      'options',
      data.options.filter((_, i) => i !== index)
    )
  }

  function updateOption(index: number, value: string) {
    const updated = [...data.options]
    updated[index] = value
    setData('options', updated)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/admin/polls')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0c', color: '#fff', padding: '48px' }}>
      <PageHeader
        userName={user?.fullName ?? user?.email}
        links={[{ label: 'Trash', href: '/admin/polls/trash' }]}
      />

      <div style={{ maxWidth: 560 }}>
        <h1
          style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 32,
            letterSpacing: -0.8,
            marginBottom: 6,
          }}
        >
          Create a Poll
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginBottom: 36 }}>
          Fill in the details below. Voters will see this poll on their dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Question</label>
            <Input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="e.g. Best frontend framework in 2025?"
              style={inputStyle}
              className="placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
            />
            {errors.title && (
              <p style={{ fontSize: 12, color: '#fca5a5', marginTop: 5 }}>{errors.title}</p>
            )}
          </div>

          {/* Color */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Color</label>
            <PollColorSwatch value={data.pollColor} onChange={(c) => setData('pollColor', c)} />
          </div>

          {/* Closes at */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Closes at</label>
            <Input
              type="datetime-local"
              value={data.closesAt}
              onChange={(e) => setData('closesAt', e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
              className="focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
            />
            {errors.closesAt && (
              <p style={{ fontSize: 12, color: '#fca5a5', marginTop: 5 }}>{errors.closesAt}</p>
            )}
          </div>

          {/* Options */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>
              Options{' '}
              <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.6 }}>
                (min 2, max 10)
              </span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    style={{ ...inputStyle, flex: 1 }}
                    className="placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
                  />
                  {data.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(i)}
                      style={{
                        width: 36,
                        height: 36,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 7,
                        color: 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.15s',
                      }}
                      className="hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {errors.options && (
              <p style={{ fontSize: 12, color: '#fca5a5', marginTop: 5 }}>{errors.options}</p>
            )}

            {data.options.length < 10 && (
              <button
                type="button"
                onClick={addOption}
                style={{
                  marginTop: 8,
                  width: '100%',
                  padding: '9px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px dashed rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                className="hover:bg-white/6 hover:text-white/60 hover:border-white/20"
              >
                + Add option
              </button>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Link
              href="/admin"
              style={{
                padding: '9px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                color: 'rgba(255,255,255,0.5)',
                fontSize: 14,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={processing}
              style={{
                padding: '9px 24px',
                background: '#6366f1',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                cursor: processing ? 'not-allowed' : 'pointer',
                opacity: processing ? 0.7 : 1,
                height: 'auto',
              }}
              className="hover:bg-indigo-600 transition-colors"
            >
              {processing ? 'Creating…' : 'Create Poll'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
