import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signupValidator } from '#validators/user'

export default class NewAccountController {
  /**
   * GET /register
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/signup', {})
  }

  /**
   * POST /register
   * Creates the account, logs in immediately, then redirects by role:
   *  - admin  → /admin
   *  - voter  → /polls
   */
  async store({ request, auth, response, session }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    })

    await auth.use('web').login(user)

    session.flash('success', `Account created! Welcome, ${user.fullName ?? user.email}.`)

    return response.redirect().toRoute(user.isAdmin ? 'admin.dashboard' : 'polls.index')
  }
}
