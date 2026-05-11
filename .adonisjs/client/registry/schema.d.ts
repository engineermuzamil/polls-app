/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/home_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/home_controller').default['index']>>>
    }
  }
  'auth.login': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['showLogin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['showLogin']>>>
    }
  }
  'auth.login.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['logout']>>>
    }
  }
  'auth.register': {
    methods: ["GET","HEAD"]
    pattern: '/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'auth.register.store': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'polls.index': {
    methods: ["GET","HEAD"]
    pattern: '/polls'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['index']>>>
    }
  }
  'polls.show': {
    methods: ["GET","HEAD"]
    pattern: '/polls/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['show']>>>
    }
  }
  'polls.vote': {
    methods: ["POST"]
    pattern: '/polls/:slug/vote'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/poll').voteValidator)>>
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/poll').voteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['vote']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['vote']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'polls.results': {
    methods: ["GET","HEAD"]
    pattern: '/polls/:slug/results'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['results']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/polls_controller').default['results']>>>
    }
  }
  'admin.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['dashboard']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['dashboard']>>>
    }
  }
  'admin.polls.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/polls/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['create']>>>
    }
  }
  'admin.polls.trash': {
    methods: ["GET","HEAD"]
    pattern: '/admin/polls/trash'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['trash']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['trash']>>>
    }
  }
  'admin.polls.store': {
    methods: ["POST"]
    pattern: '/admin/polls'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/poll').createPollValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/poll').createPollValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.polls.delete': {
    methods: ["DELETE"]
    pattern: '/admin/polls/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['softDelete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['softDelete']>>>
    }
  }
  'admin.polls.restore': {
    methods: ["PATCH"]
    pattern: '/admin/polls/:slug/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['restore']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['restore']>>>
    }
  }
  'admin.polls.force-delete': {
    methods: ["DELETE"]
    pattern: '/admin/polls/:slug/force'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['forceDelete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_polls_controller').default['forceDelete']>>>
    }
  }
}
