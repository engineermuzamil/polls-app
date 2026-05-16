/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  auth: {
    login: typeof routes['auth.login'] & {
      store: typeof routes['auth.login.store']
    }
    logout: typeof routes['auth.logout']
    register: typeof routes['auth.register'] & {
      store: typeof routes['auth.register.store']
    }
  }
  polls: {
    index: typeof routes['polls.index']
    show: typeof routes['polls.show']
    vote: typeof routes['polls.vote']
    results: typeof routes['polls.results']
  }
  admin: {
    dashboard: typeof routes['admin.dashboard']
    polls: {
      create: typeof routes['admin.polls.create']
      trash: typeof routes['admin.polls.trash']
      store: typeof routes['admin.polls.store']
      delete: typeof routes['admin.polls.delete']
      restore: typeof routes['admin.polls.restore']
      forceDelete: typeof routes['admin.polls.force-delete']
    }
  }
}
