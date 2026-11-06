
const { defineConfig } = require('vite')
const tailwindcss = require('@tailwindcss/vite').default
const { resolve } = require('path')

module.exports = defineConfig({
  root: resolve('./Inventory/static/src'),
  base: '/static/',

  plugins: [
    tailwindcss(),
  ],

  server: {
    host: 'localhost',
    port: 5173,
    open: false,
    watch: {
      usePolling: true,
    },
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  build: {
    outDir: resolve('./Inventory/static/dist'),
    assetsDir: '',
    manifest: true,
    emptyOutDir: true,
    target: 'es2015',

    rollupOptions: {
      input: {
        main: resolve('./Inventory/static/src/js/main.jsx'),
      },
    },
  },
})

