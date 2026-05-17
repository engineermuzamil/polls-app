import app from '@adonisjs/core/services/app'
import { defineConfig, stores } from '@adonisjs/session'

const sessionConfig = defineConfig({
  enabled: true,
  cookieName: 'adonis-session',
  clearWithBrowser: false,
  age: '2h',

  cookie: {
    path: '/',
    httpOnly: true,
    secure: app.inProduction,
    sameSite: 'lax',
  },

  /*
   * Cookie driver — session data lives in an encrypted browser cookie.
   * No database sessions table needed. Works in dev and production.
   * Security comes from APP_KEY — the cookie is signed and cannot be tampered.
   */
  store: 'cookie',

  stores: {
    cookie: stores.cookie(),
  },
})

export default sessionConfig
