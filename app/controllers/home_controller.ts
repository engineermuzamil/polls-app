import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * GET /
   * If the user is already logged in, redirect them straight to their dashboard.
   * Only unauthenticated visitors see the public landing page.
   */
  async index({ inertia, auth, response }: HttpContext) {
    throw new Error('test')
    const isLoggedIn = await auth.check()

    if (isLoggedIn) {
      const user = auth.getUserOrFail()
      return response.redirect().toRoute(user.isAdmin ? 'admin.dashboard' : 'polls.index')
    }

    return inertia.render('home', {})
  }
}
