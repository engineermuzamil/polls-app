import { useForm, usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import { POLL_COLORS } from '~/types/poll'
import PageHeader from '~/components/page_header'
import PollColorSwatch from '~/components/polls/poll_color_swatch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = InertiaProps<Record<string, never>>

export default function CreatePoll() {
  const { user } = usePage<Props>().props

  const { data, setData, post, processing, errors } = useForm<{
    title: string
    pollColor: string
    closesAt: string
    options: string[]
  }>({
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
    <div className="min-h-screen bg-[#0c0c0c] text-white p-12">
      <PageHeader
        userName={user?.fullName ?? user?.email}
        links={[{ label: 'Trash', href: '/admin/polls/trash' }]}
      />

      <div className="max-w-[560px]">
        <h1 className="font-['Instrument_Serif',serif] text-[32px] tracking-tight mb-1.5">
          Create a Poll
        </h1>
        <p className="text-sm text-white/35 mb-9">
          Fill in the details below. Voters will see this poll on their dashboard.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <Label className="block text-[11px] font-medium text-white/45 uppercase tracking-widest mb-2">
              Question
            </Label>
            <Input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="e.g. Best frontend framework in 2025?"
              className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-10"
            />
            {errors.title && <p className="text-xs text-red-400 mt-1.5">{errors.title}</p>}
          </div>

          {/* Color */}
          <div>
            <Label className="block text-[11px] font-medium text-white/45 uppercase tracking-widest mb-2">
              Color
            </Label>
            <PollColorSwatch value={data.pollColor} onChange={(c) => setData('pollColor', c)} />
          </div>

          {/* Closes at */}
          <div>
            <Label className="block text-[11px] font-medium text-white/45 uppercase tracking-widest mb-2">
              Closes at
            </Label>
            <Input
              type="datetime-local"
              value={data.closesAt}
              onChange={(e) => setData('closesAt', e.target.value)}
              className="bg-white/6 border-white/10 text-white focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-10 [color-scheme:dark]"
            />
            {errors.closesAt && <p className="text-xs text-red-400 mt-1.5">{errors.closesAt}</p>}
          </div>

          {/* Options */}
          <div>
            <Label className="block text-[11px] font-medium text-white/45 uppercase tracking-widest mb-2">
              Options{' '}
              <span className="normal-case tracking-normal opacity-60">(min 2, max 10)</span>
            </Label>
            <div className="flex flex-col gap-2">
              {data.options.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-10"
                  />
                  {data.options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeOption(i)}
                      className="w-9 h-9 shrink-0 bg-white/5 border-white/8 text-white/30 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-colors"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {errors.options && <p className="text-xs text-red-400 mt-1.5">{errors.options}</p>}
            {data.options.length < 10 && (
              <button
                type="button"
                onClick={addOption}
                className="mt-2 w-full py-2.5 bg-white/3 border border-dashed border-white/12 rounded-lg text-[13px] text-white/35 cursor-pointer transition-all hover:bg-white/6 hover:text-white/60 hover:border-white/20"
              >
                + Add option
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 justify-end pt-2">
            <Button
              variant="outline"
              asChild
              className="bg-white/5 border-white/8 text-white/50 hover:bg-white/8 hover:text-white/70 hover:border-white/15"
            >
              <Link href="/admin">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={processing}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors disabled:opacity-60"
            >
              {processing ? 'Creating…' : 'Create Poll'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
