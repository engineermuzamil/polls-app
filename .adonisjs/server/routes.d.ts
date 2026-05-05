import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'session.show_login': { paramsTuple?: []; params?: {} }
    'session.login': { paramsTuple?: []; params?: {} }
    'session.logout': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'polls.index': { paramsTuple?: []; params?: {} }
    'polls.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.vote': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.results': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin_polls.store': { paramsTuple?: []; params?: {} }
    'admin_polls.trash': { paramsTuple?: []; params?: {} }
    'admin_polls.soft_delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin_polls.restore': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin_polls.force_delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'session.show_login': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'polls.index': { paramsTuple?: []; params?: {} }
    'polls.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.results': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin_polls.trash': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'session.show_login': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'polls.index': { paramsTuple?: []; params?: {} }
    'polls.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'polls.results': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin_polls.trash': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'session.login': { paramsTuple?: []; params?: {} }
    'session.logout': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'polls.vote': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin_polls.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'admin_polls.soft_delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin_polls.force_delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  PATCH: {
    'admin_polls.restore': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}