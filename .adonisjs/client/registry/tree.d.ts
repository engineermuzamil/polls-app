/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  session: {
    showLogin: typeof routes['session.show_login']
    login: typeof routes['session.login']
    logout: typeof routes['session.logout']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  polls: {
    index: typeof routes['polls.index']
    show: typeof routes['polls.show']
    vote: typeof routes['polls.vote']
    results: typeof routes['polls.results']
  }
  admin: {
    dashboard: typeof routes['admin.dashboard']
  }
  adminPolls: {
    store: typeof routes['admin_polls.store']
    trash: typeof routes['admin_polls.trash']
    softDelete: typeof routes['admin_polls.soft_delete']
    restore: typeof routes['admin_polls.restore']
    forceDelete: typeof routes['admin_polls.force_delete']
  }
}
