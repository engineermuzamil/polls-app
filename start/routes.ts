import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'

router.on('/').renderInertia('home', {}).as('home')

// ─── Auth (guest middleware on GET — redirects logged-in users away) ─────────
router.get('/login', [controllers.Session, 'showLogin']).use(middleware.guest())
router.post('/login', [controllers.Session, 'login'])
router.post('/logout', [controllers.Session, 'logout']).use(middleware.auth())

router.get('/register', [controllers.NewAccount, 'create']).use(middleware.guest())
router.post('/register', [controllers.NewAccount, 'store'])

// ─── Voter routes (auth only) ────────────────────────────────────────────────
router
  .group(() => {
    router.get('/', [controllers.Polls, 'index']).as('polls.index')
    router.get('/:slug', [controllers.Polls, 'show'])
    router.post('/:slug/vote', [controllers.Polls, 'vote'])
  })
  .prefix('/polls')
  .use(middleware.auth())

// Public results — no auth needed (shareable link)
router.get('/polls/:slug/results', [controllers.Polls, 'results'])

// ─── Admin routes (auth + admin) ─────────────────────────────────────────────
router
  .group(() => {
    router.get('/', [controllers.AdminPolls, 'dashboard']).as('admin.dashboard')
    router.post('/polls', [controllers.AdminPolls, 'store'])
    router.get('/polls/trash', [controllers.AdminPolls, 'trash'])
    router.delete('/polls/:slug', [controllers.AdminPolls, 'softDelete'])
    router.patch('/polls/:slug/restore', [controllers.AdminPolls, 'restore'])
    router.delete('/polls/:slug/force', [controllers.AdminPolls, 'forceDelete'])
  })
  .prefix('/admin')
  .use([middleware.auth(), middleware.admin()])
