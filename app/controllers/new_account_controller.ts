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
   */
  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    })

    await auth.use('web').login(user)

    return response.created({
      message: 'Account created successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    })
  }
}
