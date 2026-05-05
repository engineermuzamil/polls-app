import Poll from '#models/poll'

/**
 * Formats a Poll model into a plain object safe to send as JSON.
 * Used by both the voter and admin controllers to keep the response shape consistent.
 */
export function formatPoll(poll: Poll) {
  return {
    id: poll.id,
    title: poll.title,
    slug: poll.slug,
    pollColor: poll.pollColor,
    closesAt: poll.closesAt.toISO(),
    closesAtRelative: poll.closesAt.toRelative(),
    expired: poll.expired,
    isTrashed: poll.deletedAt !== null,
    deletedAt: poll.deletedAt?.toISO() ?? null,
    votesCount: Number(poll.$extras.votes_count ?? 0),
    author: poll.author ? { id: poll.author.id, fullName: poll.author.fullName } : null,
  }
}
