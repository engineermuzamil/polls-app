import vine from '@vinejs/vine'

// ─── Reusable rules ──────────────────────────────────────────────────────────

const email = () => vine.string().trim().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

// ─── Signup validator ────────────────────────────────────────────────────────

export const signupValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: email().unique({ table: 'users', column: 'email' }),
    password: password(),

    // Role is selected by the user on the signup form.
    // Both admin and voter can self-register for now.
    role: vine.enum(['admin', 'voter'] as const),
  })
)
