// Matches the shape returned by formatPoll() in app/utils/poll_formatter.ts
export type PollData = {
  id: number
  title: string
  slug: string
  pollColor: string
  closesAt: string
  closesAtRelative: string | null
  expired: boolean
  isTrashed: boolean
  deletedAt: string | null
  votesCount: number
  author: { id: number; fullName: string | null } | null
}

// Matches the options shape returned by show/results controllers
export type OptionData = {
  id: number
  label: string
  votesCount: number
  percentage: number
}

// Available poll accent colors for the create form swatch picker
export const POLL_COLORS = [
  { value: '#6366f1', label: 'Indigo' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#10b981', label: 'Emerald' },
  { value: '#ef4444', label: 'Red' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Violet' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#14b8a6', label: 'Teal' },
] as const
