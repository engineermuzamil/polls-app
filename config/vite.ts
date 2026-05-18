import { defineConfig } from '@adonisjs/vite'
import app from '@adonisjs/core/services/app'

const viteBackendConfig = defineConfig({
  buildDirectory: 'public/assets',

  manifestFile: `${app.inProduction ? 'build/' : ''}public/assets/.vite/manifest.json`,

  assetsUrl: '/assets',

  scriptAttributes: {
    defer: true,
  },
})

export default viteBackendConfig
