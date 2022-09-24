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
      { hid: 'description', name: 'description', content: 'Create responsive quizzes for free with ease. No registration required.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    /* 'assets/css/bootstrapOverride.scss',
    'assets/css/main.scss' */
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/recaptcha',
    '@nuxtjs/tailwindcss',
    ['nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faSquareFull', 'faAt', 'faEnvelope', 'faUser']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faGoogle', 'faFacebook']
        }
      ]
    }],
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
        },
        services: {
          auth: true,
          storage: true,
          database: {
            emulatorPort: 9000,
            emulatorHost: 'localhost'
          },
          analytics: true
        }
      }
    ]
  ],
  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    mode: 'base', // Mode: 'base', 'enterprise'
    siteKey: '6LcthQgiAAAAAOMeIqe7sRcEIImZXsSAS51MJ8fS', // Development Site key for requests
    version: 3 // Version
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
