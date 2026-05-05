import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import PollOption from '#models/poll_option'
import PollVote from '#models/poll_vote'

export default class Poll extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare pollColor: string

  @column.dateTime()
  declare closesAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // ─── Relationships ───────────────────────────────────────────────────────────

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare author: BelongsTo<typeof User>

  @hasMany(() => PollOption, {
    foreignKey: 'pollId',
  })
  declare options: HasMany<typeof PollOption>

  @hasMany(() => PollVote, {
    foreignKey: 'pollId',
  })
  declare votes: HasMany<typeof PollVote>

  // ─── Computed ────────────────────────────────────────────────────────────────

  /**
   * Returns true when the poll's closing time has passed.
   * Derived from closesAt — no DB column needed.
   */
  get expired(): boolean {
    return this.closesAt.diff(DateTime.local(), 'seconds').seconds <= 0
  }
}
