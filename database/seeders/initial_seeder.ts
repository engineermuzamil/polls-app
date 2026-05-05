import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import User from '#models/user'
import Poll from '#models/poll'
import PollOption from '#models/poll_option'

export default class extends BaseSeeder {
  async run() {
    // ─── Users ───────────────────────────────────────────────────────────────

    const admin = await User.updateOrCreate(
      { email: 'muzamil@polls.dev' },
      {
        fullName: 'Muzamil',
        email: 'muzamil@polls.dev',
        password: 'password123',
        role: 'admin',
      }
    )

    const [alice, bob, sara] = await Promise.all([
      User.updateOrCreate(
        { email: 'alice@polls.dev' },
        {
          fullName: 'Alice Johnson',
          email: 'alice@polls.dev',
          password: 'password123',
          role: 'voter',
        }
      ),
      User.updateOrCreate(
        { email: 'bob@polls.dev' },
        { fullName: 'Bob Smith', email: 'bob@polls.dev', password: 'password123', role: 'voter' }
      ),
      User.updateOrCreate(
        { email: 'sara@polls.dev' },
        { fullName: 'Sara Ahmed', email: 'sara@polls.dev', password: 'password123', role: 'voter' }
      ),
    ])

    // ─── Poll 1 — active, closes in 7 days ───────────────────────────────────

    const poll1 = await Poll.updateOrCreate(
      { slug: 'best-frontend-framework-2025' },
      {
        userId: admin.id,
        title: 'Best frontend framework in 2025?',
        slug: 'best-frontend-framework-2025',
        pollColor: '#6366f1',
        closesAt: DateTime.local().plus({ days: 7 }),
        deletedAt: null,
      }
    )

    // Only create options if none exist yet
    const poll1OptionCount = await poll1.related('options').query().count('* as total')
    if (Number(poll1OptionCount[0].$extras.total) === 0) {
      await poll1
        .related('options')
        .createMany([
          { label: 'React' },
          { label: 'Vue' },
          { label: 'Svelte' },
          { label: 'Angular' },
        ])
    }

    // ─── Poll 2 — active, closes in 3 days ───────────────────────────────────

    const poll2 = await Poll.updateOrCreate(
      { slug: 'preferred-database-for-new-projects' },
      {
        userId: admin.id,
        title: 'Preferred database for new projects?',
        slug: 'preferred-database-for-new-projects',
        pollColor: '#10b981',
        closesAt: DateTime.local().plus({ days: 3 }),
        deletedAt: null,
      }
    )

    const poll2OptionCount = await poll2.related('options').query().count('* as total')
    if (Number(poll2OptionCount[0].$extras.total) === 0) {
      await poll2
        .related('options')
        .createMany([
          { label: 'PostgreSQL' },
          { label: 'MySQL' },
          { label: 'SQLite' },
          { label: 'MongoDB' },
        ])
    }

    // ─── Poll 3 — already expired (closed 2 days ago) ────────────────────────

    const poll3 = await Poll.updateOrCreate(
      { slug: 'best-code-editor' },
      {
        userId: admin.id,
        title: 'Best code editor?',
        slug: 'best-code-editor',
        pollColor: '#f59e0b',
        closesAt: DateTime.local().minus({ days: 2 }),
        deletedAt: null,
      }
    )

    const poll3OptionCount = await poll3.related('options').query().count('* as total')
    if (Number(poll3OptionCount[0].$extras.total) === 0) {
      await poll3
        .related('options')
        .createMany([{ label: 'VS Code' }, { label: 'Neovim' }, { label: 'WebStorm' }])
    }

    // ─── Sample votes on the expired poll ────────────────────────────────────

    const vsCode = await PollOption.query()
      .where('poll_id', poll3.id)
      .where('label', 'VS Code')
      .firstOrFail()

    // Use updateOrCreate to keep the seeder idempotent (safe to re-run)
    await poll3
      .related('votes')
      .updateOrCreate({ userId: alice.id }, { userId: alice.id, pollOptionId: vsCode.id })
    await poll3
      .related('votes')
      .updateOrCreate({ userId: bob.id }, { userId: bob.id, pollOptionId: vsCode.id })

    console.log('✅ Seed complete')
    console.log('')
    console.log('  Admin   → muzamil@polls.dev / password123')
    console.log('  Voter 1 → alice@polls.dev   / password123')
    console.log('  Voter 2 → bob@polls.dev     / password123')
    console.log('  Voter 3 → sara@polls.dev    / password123')
  }
}
