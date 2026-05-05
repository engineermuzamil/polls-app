import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Poll from '#models/poll'
import PollVote from '#models/poll_vote'

const AuthFinder = withAuthFinder(hash, {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'admin' | 'voter'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // ─── Relationships ───────────────────────────────────────────────────────────

  @hasMany(() => Poll)
  declare polls: HasMany<typeof Poll>

  @hasMany(() => PollVote)
  declare votes: HasMany<typeof PollVote>

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  get isAdmin(): boolean {
    return this.role === 'admin'
  }

  get isVoter(): boolean {
    return this.role === 'voter'
  }

  get initials(): string {
    if (!this.fullName) {
      return ''
    }

    return this.fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
  }
}
