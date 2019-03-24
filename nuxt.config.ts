require('dotenv').config()
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')
const i18n = require('./config/i18n')

const isDev = process.env.NODE_ENV !== 'production'

const API_URL = process.env.API_URL || 'http://localhost:2450/api'
const AUTH_URL = `${API_URL}/account`

module.exports = {
  mode: 'spa',
  modern: !isDev,

  /*
  ** Manifest
  */
  // manifest: {
  //   name: 'Boccialyzer',
  //   short_name: 'Blyzer',
  //   description: 'NuxtJS project for Boccia Ukraine',
  //   theme_color: '#188269'
  // },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet',  href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Exo+2:100,300,400,500,700,900&amp;subset=cyrillic'
      }
    ]
    // scripts:[
    //   {
    //     rel: 'text/javasccript',
    //     href:
    //       'https://unpkg.com/babel-polyfill/dist/polyfill.min.js'
    //   }
    // ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0022bb' },
  // loading: {
  //   name: 'chasing-dots',
  //   color: '#ff5638',
  //   background: 'white',
  //   height: '4px'
  // },

  /*
  ** Global CSS
  */
  css: [
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/style/app'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/axios',
    '~/plugins/api',
    '~/plugins/vuetify',
    '~/plugins/noty',
    '~/plugins/hotkey',
    '~/plugins/eventbus',
    '~/plugins/spinners',
    '~/plugins/flag-icon',
    '~/plugins/tasty-burger-button'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-i18n', i18n],
    ['@nuxtjs/dotenv', { filename: '.env' }],
    ['@nuxtjs/moment', { locales: ['uk', 'ru'],  defaultLocale: 'en',  plugin: true }]
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    debug: isDev,
    proxy: true,
    // baseURL: API_URL,
    // redirectError: {
    //   401: '/login',
    //   404: '/notfound'
    // }
  },
  proxy: {
    "/api": API_URL
  },

  /*
  ** Moment module configuration
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: `${AUTH_URL}/Login`, method: 'post' },
          logout: { url: `${AUTH_URL}/Logout`, method: 'get' },
          user: false // { url: `${AUTH_URL}/getProfile`, method: 'get', propertyName: '' }
        },
        tokenRequired: false,
        // tokenType: 'Bearer'
      },
      facebook: {
        client_id: '1671464192946675',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {
        client_id: '147906604243-uj9457qvor9uv4tf4fcuevm0088gprjr.apps.googleusercontent.com'
      },
      twitter: {
        client_id: 'FAJNuxjMTicff6ciDKLiZ4t0D'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      user: '/profile',
      home: '/',
      callback: false //'/callback'
    },
    plugins: ['~/plugins/auth']
  },

  router: {
    middleware: 'auth'
  },

  Vue: {
    config: {
      silent: !isDev,
      devtools: true,
      performance: isDev,
      productionTip: false
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
