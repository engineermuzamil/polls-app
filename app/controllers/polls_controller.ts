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
   * Renders the poll detail page via Inertia.
   */
  async show({ params, auth, inertia }: HttpContext) {
    const user = auth.getUserOrFail()

    const poll = await Poll.query()
      .where('slug', params.slug)
      .whereNull('deleted_at')
      .preload('author')
      .preload('options', (q) => q.withCount('votes'))
      .withCount('votes')
      .firstOrFail()

    const existingVote = await PollVote.query()
      .where('poll_id', poll.id)
      .where('user_id', user.id)
      .first()

    const totalVotes = Number(poll.$extras.votes_count)

    const options = poll.options.map((opt) => ({
      id: opt.id,
      label: opt.label,
      votesCount: Number(opt.$extras.votes_count),
      percentage:
        totalVotes > 0 ? Math.round((Number(opt.$extras.votes_count) / totalVotes) * 1000) / 10 : 0,
    }))

    return inertia.render('polls/show', {
      poll: formatPoll(poll),
      options,
      hasVoted: !!existingVote,
      userVoteOptionId: existingVote?.pollOptionId ?? null,
      totalVotes,
      isAdmin: user.isAdmin,
    })
  }

  /**
   * POST /polls/:slug/vote
   * Records a vote then redirects back to the poll page with flash.
   */
  async vote({ params, request, auth, response, session }: HttpContext) {
    const user = auth.getUserOrFail()

    const poll = await Poll.query().where('slug', params.slug).whereNull('deleted_at').firstOrFail()

    if (user.isAdmin) {
      session.flash('error', 'Admins do not vote on polls')
      return response.redirect().toRoute('polls.show', { slug: params.slug })
    }

    if (poll.expired) {
      session.flash('error', 'This poll has closed and is no longer accepting votes')
      return response.redirect().toRoute('polls.show', { slug: params.slug })
    }

    const existingVote = await PollVote.query()
      .where('poll_id', poll.id)
      .where('user_id', user.id)
      .first()

    if (existingVote) {
      session.flash('error', 'You have already voted on this poll')
      return response.redirect().toRoute('polls.show', { slug: params.slug })
    }

    const { poll_option_id } = await request.validateUsing(voteValidator)

    const option = await poll.related('options').query().where('id', poll_option_id).first()

    if (!option) {
      session.flash('error', 'Invalid option for this poll')
      return response.redirect().toRoute('polls.show', { slug: params.slug })
    }

    await PollVote.create({
      pollId: poll.id,
      pollOptionId: poll_option_id,
      userId: user.id,
    })

    session.flash('success', 'Your vote has been recorded')
    return response.redirect().toRoute('polls.show', { slug: params.slug })
  }

  /**
   * GET /polls/:slug/results
   * Public read-only results page.
   */
  async results({ params, inertia }: HttpContext) {
    const poll = await Poll.query()
      .where('slug', params.slug)
      .whereNull('deleted_at')
      .preload('author')
      .preload('options', (q) => q.withCount('votes'))
      .withCount('votes')
      .firstOrFail()

    const totalVotes = Number(poll.$extras.votes_count)

    const options = poll.options.map((opt) => ({
      id: opt.id,
      label: opt.label,
      votesCount: Number(opt.$extras.votes_count),
      percentage:
        totalVotes > 0 ? Math.round((Number(opt.$extras.votes_count) / totalVotes) * 1000) / 10 : 0,
    }))

    return inertia.render('polls/results', {
      poll: formatPoll(poll),
      options,
      totalVotes,
    })
  }
}
