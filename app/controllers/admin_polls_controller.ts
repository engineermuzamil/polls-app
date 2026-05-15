import type { HttpContext } from '@adonisjs/core/http'
import Poll from '#models/poll'
import { createPollValidator } from '#validators/poll'
import { generateSlug } from '#utils/slug'
import { formatPoll } from '#utils/poll_formatter'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import test from 'node:test'

export default class AdminPollsController {
  /**
   * GET /admin
   * Renders the admin dashboard with active, expired, and trashed poll counts.
   */
  async dashboard({ inertia }: HttpContext) {
    // throw new Error('test')
    const allPollsRaw = await Poll.query()
      .preload('author')
      .withCount('votes')
      .orderBy('created_at', 'desc')

    const now = DateTime.local()

    const activePolls = allPollsRaw
      .filter((p) => p.deletedAt === null && p.closesAt > now)
      .map((p) => formatPoll(p))

    const expiredPolls = allPollsRaw
      .filter((p) => p.deletedAt === null && p.closesAt <= now)
      .map((p) => formatPoll(p))

    const trashedCount = allPollsRaw.filter((p) => p.deletedAt !== null).length

    return inertia.render('admin/dashboard', { activePolls, expiredPolls, trashedCount })
  }

  /**
   * GET /admin/polls/create
   * Renders the create poll form.
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('admin/polls/create', {})
  }

  /**
   * POST /admin/polls
   * Creates a poll with options inside a transaction, then redirects with flash.
   */
  async store({ request, auth, response, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const { title, pollColor, closesAt, options } = await request.validateUsing(createPollValidator)

    const slug = await generateSlug(title)
    const closesAtDateTime = DateTime.fromISO(closesAt)

    await db.transaction(async (trx) => {
      const newPoll = await Poll.create(
        {
          userId: user.id,
          title,
          slug,
          pollColor: pollColor ?? '#6366f1',
          closesAt: closesAtDateTime,
        },
        { client: trx }
      )

      await newPoll
        .useTransaction(trx)
        .related('options')
        .createMany(options.map((label) => ({ label })))

      return newPoll
    })

    session.flash('success', 'Poll created successfully')
    return response.redirect().toRoute('admin.dashboard')
  }

  /**
   * GET /admin/polls/trash
   * Renders the trash page with soft-deleted polls.
   */
  async trash({ inertia }: HttpContext) {
    const trashedPolls = await Poll.query()
      .whereNotNull('deleted_at')
      .preload('author')
      .withCount('votes')
      .orderBy('deleted_at', 'desc')

    return inertia.render('admin/polls/trash', {
      trashedPolls: trashedPolls.map((p) => formatPoll(p)),
    })
  }

  /**
   * DELETE /admin/polls/:slug
   * Soft delete — sets deleted_at. Redirects back with flash.
   */
  async softDelete({ params, response, session }: HttpContext) {
    const poll = await Poll.query().where('slug', params.slug).whereNull('deleted_at').firstOrFail()

    poll.deletedAt = DateTime.local()
    await poll.save()

    session.flash('success', 'Poll moved to trash')
    return response.redirect().toRoute('admin.dashboard')
  }

  /**
   * PATCH /admin/polls/:slug/restore
   * Restores a soft-deleted poll. Redirects to trash with flash.
   */
  async restore({ params, response, session }: HttpContext) {
    const poll = await Poll.query()
      .where('slug', params.slug)
      .whereNotNull('deleted_at')
      .firstOrFail()

    poll.deletedAt = null
    await poll.save()

    session.flash('success', 'Poll restored successfully')
    return response.redirect().toRoute('admin.polls.trash')
  }

  /**
   * DELETE /admin/polls/:slug/force
   * Permanently deletes a poll (must be in trash first).
   * Cascades to poll_options and poll_votes via DB constraints.
   */
  async forceDelete({ params, response, session }: HttpContext) {
    const poll = await Poll.query()
      .where('slug', params.slug)
      .whereNotNull('deleted_at')
      .firstOrFail()

    await poll.delete()

    session.flash('success', 'Poll permanently deleted')
    return response.redirect().toRoute('admin.polls.trash')
  }
}
