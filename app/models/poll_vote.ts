import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Poll from '#models/poll'
import PollOption from '#models/poll_option'
import User from '#models/user'

export default class PollVote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pollId: number

  @column()
  declare pollOptionId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // ─── Relationships ───────────────────────────────────────────────────────────

  @belongsTo(() => Poll, {
    foreignKey: 'pollId',
  })
  declare poll: BelongsTo<typeof Poll>

  @belongsTo(() => PollOption, {
    foreignKey: 'pollOptionId',
  })
  declare pollOption: BelongsTo<typeof PollOption>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>
}
