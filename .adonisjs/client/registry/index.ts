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
  'auth.login': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.login.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login.store']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.register': {
    methods: ["GET","HEAD"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.register.store': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register.store']['types'],
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
  'admin.polls.store': {
    methods: ["POST"],
    pattern: '/admin/polls',
    tokens: [{"old":"/admin/polls","type":0,"val":"admin","end":""},{"old":"/admin/polls","type":0,"val":"polls","end":""}],
    types: placeholder as Registry['admin.polls.store']['types'],
  },
  'admin.polls.trash': {
    methods: ["GET","HEAD"],
    pattern: '/admin/polls/trash',
    tokens: [{"old":"/admin/polls/trash","type":0,"val":"admin","end":""},{"old":"/admin/polls/trash","type":0,"val":"polls","end":""},{"old":"/admin/polls/trash","type":0,"val":"trash","end":""}],
    types: placeholder as Registry['admin.polls.trash']['types'],
  },
  'admin.polls.delete': {
    methods: ["DELETE"],
    pattern: '/admin/polls/:slug',
    tokens: [{"old":"/admin/polls/:slug","type":0,"val":"admin","end":""},{"old":"/admin/polls/:slug","type":0,"val":"polls","end":""},{"old":"/admin/polls/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['admin.polls.delete']['types'],
  },
  'admin.polls.restore': {
    methods: ["PATCH"],
    pattern: '/admin/polls/:slug/restore',
    tokens: [{"old":"/admin/polls/:slug/restore","type":0,"val":"admin","end":""},{"old":"/admin/polls/:slug/restore","type":0,"val":"polls","end":""},{"old":"/admin/polls/:slug/restore","type":1,"val":"slug","end":""},{"old":"/admin/polls/:slug/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['admin.polls.restore']['types'],
  },
  'admin.polls.force-delete': {
    methods: ["DELETE"],
    pattern: '/admin/polls/:slug/force',
    tokens: [{"old":"/admin/polls/:slug/force","type":0,"val":"admin","end":""},{"old":"/admin/polls/:slug/force","type":0,"val":"polls","end":""},{"old":"/admin/polls/:slug/force","type":1,"val":"slug","end":""},{"old":"/admin/polls/:slug/force","type":0,"val":"force","end":""}],
    types: placeholder as Registry['admin.polls.force-delete']['types'],
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
