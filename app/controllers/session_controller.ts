import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth'

export default class SessionController {
  /**
   * GET /login
   */
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  /**
   * POST /login
   * Validates credentials, creates a session, then redirects by role:
   *  - admin  → /admin
   *  - voter  → /polls
   */
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    session.flash('success', `Welcome back, ${user.fullName ?? user.email}!`)

    return response.redirect().toRoute(user.isAdmin ? 'admin.dashboard' : 'polls.index')
  }

  /**
   * POST /logout
   * Destroys the session and sends the user back to /login.
   */
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', 'You have been signed out.')

    return response.redirect().toRoute('auth.login')
  }
}
