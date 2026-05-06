import type { HttpContext } from '@adonisjs/core/http'
import Poll from '#models/poll'
import PollVote from '#models/poll_vote'
import { voteValidator } from '#validators/poll'
import { formatPoll } from '#utils/poll_formatter'
import { DateTime } from 'luxon'

export default class PollsController {
  /**
   * GET /polls
   */
  async index({ inertia }: HttpContext) {
    const polls = await Poll.query()
      .whereNull('deleted_at')
      .preload('author')
      .withCount('votes')
      .orderBy('created_at', 'desc')

    const now = DateTime.local()

    const activePolls = polls.filter((p) => p.closesAt > now).map((p) => formatPoll(p))

    const closedPolls = polls.filter((p) => p.closesAt <= now).map((p) => formatPoll(p))

    return inertia.render('polls/index', { activePolls, closedPolls })
  }

  /**
   * GET /polls/:slug
  
   */
  async show({ params, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const poll = await Poll.query()
      .where('slug', params.slug)
      .whereNull('deleted_at')
      .preload('options', (q) => q.withCount('votes'))
      .withCount('votes')
      .firstOrFail()

    // Check if this user already voted on this poll
    const existingVote = await PollVote.query()
      .where('poll_id', poll.id)
      .where('user_id', user.id)
      .first()

    const totalVotes = Number(poll.$extras.votes_count)

    return response.json({
      poll: formatPoll(poll),
      options: poll.options.map((opt) => ({
        id: opt.id,
        label: opt.label,
        votesCount: Number(opt.$extras.votes_count),
        percentage:
          totalVotes > 0 ? Math.round((Number(opt.$extras.votes_count) / totalVotes) * 100) : 0,
      })),
      hasVoted: !!existingVote,
      userVoteOptionId: existingVote?.pollOptionId ?? null,
      totalVotes,
      isAdmin: user.isAdmin,
    })
  }

  /**
   * POST /polls/:slug/vote
   *
   * Records a vote for the authenticated user.
   * Guards:
   *  - Admins cannot vote
   *  - Cannot vote on expired polls
   *  - Cannot vote twice (DB unique constraint is the final guard)
   */
  async vote({ params, request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const poll = await Poll.query().where('slug', params.slug).whereNull('deleted_at').firstOrFail()

    // Admins do not vote
    if (user.isAdmin) {
      return response.badRequest({ message: 'Admins do not vote on polls' })
    }

    // Cannot vote on a closed poll
    if (poll.expired) {
      return response.badRequest({
        message: 'This poll has closed and is no longer accepting votes',
      })
    }

    // Check for duplicate vote before hitting the DB unique constraint
    const existingVote = await PollVote.query()
      .where('poll_id', poll.id)
      .where('user_id', user.id)
      .first()

    if (existingVote) {
      return response.unprocessableEntity({ message: 'You have already voted on this poll' })
    }

    const { poll_option_id } = await request.validateUsing(voteValidator)

    // Make sure the option actually belongs to this poll
    const option = await poll.related('options').query().where('id', poll_option_id).first()

    if (!option) {
      return response.badRequest({ message: 'Invalid option for this poll' })
    }

    await PollVote.create({
      pollId: poll.id,
      pollOptionId: poll_option_id,
      userId: user.id,
    })

    return response.json({ message: 'Your vote has been recorded' })
  }

  /**
   * GET /polls/:slug/results
   *
   * Returns vote counts and percentages for each option.
   */
  async results({ params, response }: HttpContext) {
    const poll = await Poll.query()
      .where('slug', params.slug)
      .whereNull('deleted_at')
      .preload('options', (q) => q.withCount('votes'))
      .withCount('votes')
      .firstOrFail()

    const totalVotes = Number(poll.$extras.votes_count)

    return response.json({
      poll: formatPoll(poll),
      options: poll.options.map((opt) => ({
        id: opt.id,
        label: opt.label,
        votesCount: Number(opt.$extras.votes_count),
        percentage:
          totalVotes > 0 ? Math.round((Number(opt.$extras.votes_count) / totalVotes) * 100) : 0,
      })),
      totalVotes,
    })
  }
}
