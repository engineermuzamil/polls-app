import type { HttpContext } from '@adonisjs/core/http'
import Poll from '#models/poll'
import { createPollValidator } from '#validators/poll'
import { generateSlug } from '#utils/slug'
import { formatPoll } from '#utils/poll_formatter'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class AdminPollsController {
  /**
   * GET /admin
   * Returns all polls split into active, expired, and a trashed count.
   */
  async dashboard({ inertia }: HttpContext) {
    // Fetch everything — active and soft-deleted — in one query
    const allPolls = await Poll.query()
      .preload('author')
      .withCount('votes')
      .orderBy('created_at', 'desc')

    const now = DateTime.local()

    const activePolls = allPolls
      .filter((p) => p.deletedAt === null && p.closesAt > now)
      .map((p) => formatPoll(p))

    const expiredPolls = allPolls
      .filter((p) => p.deletedAt === null && p.closesAt <= now)
      .map((p) => formatPoll(p))

    const trashedCount = allPolls.filter((p) => p.deletedAt !== null).length

    return inertia.render('admin/dashboard', { activePolls, expiredPolls, trashedCount })
  }

  /**
   * POST /admin/polls
   * Creates a poll with options inside a transaction.
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { title, pollColor, closesAt, options } = await request.validateUsing(createPollValidator)

    const slug = await generateSlug(title)

    // vine.date() returns a JS Date — convert to Luxon DateTime for Lucid
    const closesAtDateTime = DateTime.fromISO(closesAt)

    const poll = await db.transaction(async (trx) => {
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

    return response.created({
      message: 'Poll created successfully',
      slug: poll.slug,
    })
  }

  /**
   * GET /admin/polls/trash
   * Returns only soft-deleted polls.
   */
  async trash({ response }: HttpContext) {
    const trashedPolls = await Poll.query()
      .whereNotNull('deleted_at')
      .preload('author')
      .withCount('votes')
      .orderBy('deleted_at', 'desc')

    return response.json({
      trashedPolls: trashedPolls.map((p) => formatPoll(p)),
    })
  }

  /**
   * DELETE /admin/polls/:slug
   * Soft delete — sets deleted_at. Poll stays in DB and is recoverable.
   */
  async softDelete({ params, response }: HttpContext) {
    const poll = await Poll.query().where('slug', params.slug).whereNull('deleted_at').firstOrFail()

    poll.deletedAt = DateTime.local()
    await poll.save()

    return response.json({ message: 'Poll moved to trash' })
  }

  /**
   * PATCH /admin/polls/:slug/restore
   * Restores a soft-deleted poll by clearing deleted_at.
   */
  async restore({ params, response }: HttpContext) {
    const poll = await Poll.query()
      .where('slug', params.slug)
      .whereNotNull('deleted_at')
      .firstOrFail()

    poll.deletedAt = null
    await poll.save()

    return response.json({ message: 'Poll restored successfully' })
  }

  /**
   * DELETE /admin/polls/:slug/force
   * Permanently deletes — works on both trashed and active polls.
   * Cascades to poll_options and poll_votes via DB constraints.
   */
  async forceDelete({ params, response }: HttpContext) {
    const poll = await Poll.query().where('slug', params.slug).firstOrFail()

    await poll.delete()

    return response.json({ message: 'Poll permanently deleted' })
  }
}
