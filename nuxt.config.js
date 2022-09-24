export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Quiz App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Create complete quizzes for free with ease. No registration required. Available soon!' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icoGradient.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    /* 'assets/css/bootstrapOverride.scss',
    'assets/css/main.scss' */
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/recaptcha',
    [
      '@nuxtjs/firebase',
      {
        config: {
          ***REMOVED***
          ***REMOVED***
          ***REMOVED***
          ***REMOVED***
          ***REMOVED***
          ***REMOVED***
          ***REMOVED***
          ***REMOVED***
        },
        services: {
          database: true,
          analytics: true,
          appCheck: true
        }
      }
    ]
  ],
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    mode: 'base', // Mode: 'base', 'enterprise'
    ***REMOVED***, // Development Site key for requests
    version: 3 // Version
  },
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
