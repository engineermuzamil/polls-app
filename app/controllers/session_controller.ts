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
   */
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.json({
      message: 'Logged in successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    })
  }

  /**
   * POST /logout
   */
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.json({ message: 'Logged out successfully' })
  }
}
