import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.login.store': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.register.store': { paramsTuple?: []; params?: {} }
    'polls.index': { paramsTuple?: []; params?: {} }
    'polls.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.vote': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.results': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.polls.store': { paramsTuple?: []; params?: {} }
    'admin.polls.trash': { paramsTuple?: []; params?: {} }
    'admin.polls.delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.polls.restore': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.polls.force-delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'polls.index': { paramsTuple?: []; params?: {} }
    'polls.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.results': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.polls.trash': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'polls.index': { paramsTuple?: []; params?: {} }
    'polls.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.results': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.polls.trash': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login.store': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.register.store': { paramsTuple?: []; params?: {} }
    'polls.vote': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.polls.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'admin.polls.delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.polls.force-delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  PATCH: {
    'admin.polls.restore': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}