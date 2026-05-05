import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Poll from '#models/poll'
import PollVote from '#models/poll_vote'

export default class PollOption extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pollId: number

  @column()
  declare label: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // ─── Relationships ───────────────────────────────────────────────────────────

  @belongsTo(() => Poll, {
    foreignKey: 'pollId',
  })
  declare poll: BelongsTo<typeof Poll>

  @hasMany(() => PollVote, {
    foreignKey: 'pollOptionId',
  })
  declare votes: HasMany<typeof PollVote>
}
