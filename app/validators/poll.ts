import vine from '@vinejs/vine'

export const createPollValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    pollColor: vine.string().trim().maxLength(50).optional(),

    // Kept as string — DateTime.fromISO() in the controller parses it.
    // vine.date() causes a Luxon/TS type mismatch in AdonisJS v7.
    closesAt: vine.string().trim(),

    options: vine
      .array(vine.string().trim().minLength(1).maxLength(255))
      .minLength(2)
      .maxLength(10),
  })
)

export const voteValidator = vine.compile(
  vine.object({
    poll_option_id: vine.number().positive(),
  })
)
