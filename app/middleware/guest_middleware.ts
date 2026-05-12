import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in.
 */
export default class GuestMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    for (let guard of options.guards || [ctx.auth.defaultGuard]) {
      try {
        const isLoggedIn = await ctx.auth.use(guard).check()

        if (isLoggedIn) {
          const user = ctx.auth.use(guard).user

          if (user) {
            ctx.session.reflash()

            return ctx.response.redirect(user.isAdmin ? '/admin' : '/polls')
          }

          await ctx.auth.use(guard).logout()
        }
      } catch {
        try {
          await ctx.auth.use(guard).logout()
        } catch {}
      }
    }

    return next()
  }
}
