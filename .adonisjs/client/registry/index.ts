/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'session.show_login': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.show_login']['types'],
  },
  'session.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.login']['types'],
  },
  'session.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.logout']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'polls.index': {
    methods: ["GET","HEAD"],
    pattern: '/polls',
    tokens: [{"old":"/polls","type":0,"val":"polls","end":""}],
    types: placeholder as Registry['polls.index']['types'],
  },
  'polls.show': {
    methods: ["GET","HEAD"],
    pattern: '/polls/:slug',
    tokens: [{"old":"/polls/:slug","type":0,"val":"polls","end":""},{"old":"/polls/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['polls.show']['types'],
  },
  'polls.vote': {
    methods: ["POST"],
    pattern: '/polls/:slug/vote',
    tokens: [{"old":"/polls/:slug/vote","type":0,"val":"polls","end":""},{"old":"/polls/:slug/vote","type":1,"val":"slug","end":""},{"old":"/polls/:slug/vote","type":0,"val":"vote","end":""}],
    types: placeholder as Registry['polls.vote']['types'],
  },
  'polls.results': {
    methods: ["GET","HEAD"],
    pattern: '/polls/:slug/results',
    tokens: [{"old":"/polls/:slug/results","type":0,"val":"polls","end":""},{"old":"/polls/:slug/results","type":1,"val":"slug","end":""},{"old":"/polls/:slug/results","type":0,"val":"results","end":""}],
    types: placeholder as Registry['polls.results']['types'],
  },
  'admin.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin',
    tokens: [{"old":"/admin","type":0,"val":"admin","end":""}],
    types: placeholder as Registry['admin.dashboard']['types'],
  },
  'admin_polls.store': {
    methods: ["POST"],
    pattern: '/admin/polls',
    tokens: [{"old":"/admin/polls","type":0,"val":"admin","end":""},{"old":"/admin/polls","type":0,"val":"polls","end":""}],
    types: placeholder as Registry['admin_polls.store']['types'],
  },
  'admin_polls.trash': {
    methods: ["GET","HEAD"],
    pattern: '/admin/polls/trash',
    tokens: [{"old":"/admin/polls/trash","type":0,"val":"admin","end":""},{"old":"/admin/polls/trash","type":0,"val":"polls","end":""},{"old":"/admin/polls/trash","type":0,"val":"trash","end":""}],
    types: placeholder as Registry['admin_polls.trash']['types'],
  },
  'admin_polls.soft_delete': {
    methods: ["DELETE"],
    pattern: '/admin/polls/:slug',
    tokens: [{"old":"/admin/polls/:slug","type":0,"val":"admin","end":""},{"old":"/admin/polls/:slug","type":0,"val":"polls","end":""},{"old":"/admin/polls/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['admin_polls.soft_delete']['types'],
  },
  'admin_polls.restore': {
    methods: ["PATCH"],
    pattern: '/admin/polls/:slug/restore',
    tokens: [{"old":"/admin/polls/:slug/restore","type":0,"val":"admin","end":""},{"old":"/admin/polls/:slug/restore","type":0,"val":"polls","end":""},{"old":"/admin/polls/:slug/restore","type":1,"val":"slug","end":""},{"old":"/admin/polls/:slug/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['admin_polls.restore']['types'],
  },
  'admin_polls.force_delete': {
    methods: ["DELETE"],
    pattern: '/admin/polls/:slug/force',
    tokens: [{"old":"/admin/polls/:slug/force","type":0,"val":"admin","end":""},{"old":"/admin/polls/:slug/force","type":0,"val":"polls","end":""},{"old":"/admin/polls/:slug/force","type":1,"val":"slug","end":""},{"old":"/admin/polls/:slug/force","type":0,"val":"force","end":""}],
    types: placeholder as Registry['admin_polls.force_delete']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
