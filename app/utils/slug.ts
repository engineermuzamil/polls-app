import Poll from '#models/poll'
import string from '@adonisjs/core/helpers/string'

/**
 * Generates a unique slug from a poll title.
 * Tries "my-title", then "my-title-1", "my-title-2" etc. until free.
 */
export async function generateSlug(title: string): Promise<string> {
  const base = string.slug(title, { lower: true, strict: true })

  const existing = await Poll.findBy('slug', base)
  if (!existing) return base

  let counter = 1
  while (true) {
    const candidate = `${base}-${counter}`
    const taken = await Poll.findBy('slug', candidate)
    if (!taken) return candidate
    counter++
  }
}
