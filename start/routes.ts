import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'

// ─── Home ────────────────────────────────────────────────────────────────────
// Uses HomeController so logged-in users are redirected to their dashboard
router.get('/', [controllers.Home, 'index']).as('home')

// ─── Auth ────────────────────────────────────────────────────────────────────
router.get('/login', [controllers.Session, 'showLogin']).use(middleware.guest()).as('auth.login')
router.post('/login', [controllers.Session, 'login']).use(middleware.guest()).as('auth.login.store')
router.post('/logout', [controllers.Session, 'logout']).use(middleware.auth()).as('auth.logout')

router
  .get('/register', [controllers.NewAccount, 'create'])
  .use(middleware.guest())
  .as('auth.register')

router
  .post('/register', [controllers.NewAccount, 'store'])
  .use(middleware.guest())
  .as('auth.register.store')

// ─── Voter routes (auth required) ────────────────────────────────────────────
router
  .group(() => {
    router.get('/', [controllers.Polls, 'index']).as('polls.index')
    router.get('/:slug', [controllers.Polls, 'show']).as('polls.show')
    router.post('/:slug/vote', [controllers.Polls, 'vote']).as('polls.vote')
  })
  .prefix('/polls')
  .use(middleware.auth())

// Public results — no auth needed (shareable link)
router.get('/polls/:slug/results', [controllers.Polls, 'results']).as('polls.results')

// ─── Admin routes (auth + admin role required) ────────────────────────────────
router
  .group(() => {
    router.get('/', [controllers.AdminPolls, 'dashboard']).as('admin.dashboard')

    // IMPORTANT: /polls/create and /polls/trash must be registered BEFORE /polls/:slug
    router.get('/polls/create', [controllers.AdminPolls, 'create']).as('admin.polls.create')
    router.get('/polls/trash', [controllers.AdminPolls, 'trash']).as('admin.polls.trash')

    router.post('/polls', [controllers.AdminPolls, 'store']).as('admin.polls.store')
    router.delete('/polls/:slug', [controllers.AdminPolls, 'softDelete']).as('admin.polls.delete')
    router
      .patch('/polls/:slug/restore', [controllers.AdminPolls, 'restore'])
      .as('admin.polls.restore')
    router
      .delete('/polls/:slug/force', [controllers.AdminPolls, 'forceDelete'])
      .as('admin.polls.force-delete')
  })
  .prefix('/admin')
  .use([middleware.auth(), middleware.admin()])
