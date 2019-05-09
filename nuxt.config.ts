require('dotenv').config()
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')
const i18n = require('./config/i18n')

const isDev = process.env.NODE_ENV !== 'production'

const {
  API_URL = 'http://localhost:2450',
} = process.env

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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Exo+2:100,300,400,500,700,900&amp;subset=cyrillic' }
    ]
    // scripts:[{
    //   rel: 'text/javascript',
    //   href: 'https://unpkg.com/babel-polyfill/dist/polyfill.min.js'
    // }]
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
    '~/plugins/vuetify',
    '~/plugins/api',
    '~/plugins/async-computed',
    '~/plugins/eventbus',
    '~/plugins/filters',
    '~/plugins/flag-icon',
    '~/plugins/hotkey',
    // '~/plugins/lodash',
    // '~/plugins/mixins',
    '~/plugins/noty',
    '~/plugins/spinners',
    // '~/plugins/tasty-burger-button',
    // '~/plugins/timers',
    // { src: '~/plugins/vuex-persist', ssr: false },
    // { src: '~/plugins/local-storage', ssr: false },
    // { src: '~/plugins/nuxt-client-init', ssr: fasle }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
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
    https: false,
    proxy: true,
    credentials: true
    // prefix: BASE_URL
    // baseURL: BASE_URL
    // redirectError: {
    //   401: '/login',
    //   404: '/notfound'
    // }
  },

  proxy: {
    '/api': API_URL
  },

  /*
  ** Moment module configuration
  */
  auth: {
    strategies: {
      local: {
        _scheme: '~/services/jwt-strategy.js',
        endpoints: {
          user: { url: `/api/Account/GetProfile`, method: 'get', propertyName: '' },
          login: { url: `/api/Account/Login`, method: 'post', propertyName: '' },
          logout: false, // { url: `/api/account/logout`, method: 'get' },
          refresh: { url: `/api/Account/RefreshTokens`, method: 'post', propertyName: '' }
        }
        // tokenType: 'Bearer',
        // tokenKey: 'accessToken',
        // refreshTokenKey: 'refreshToken'
      },
      auth0: {
        domain: 'nzxt.auth0.com',
        client_id: 'wMKQRddoM79cMrcbk6yAohRXkhJpe-Rn'
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
    // watchLoggedIn: true,
    // rewriteRedirects: true,
    resetOnError: true,
    // localStorage: {
    //   prefix: 'auth.'
    // },
    scopeKey: 'role',
    cookie: false,
    redirect: {
      home: '/',
      login: '/login',
      logout: '/',
      callback: '/callback'
    },
    plugins: ['~/plugins/auth']
  },

  router: {
    middleware: ['auth']
  },

  Vue: {
    config: {
      silent: !isDev,
      devtools: true,
      performance: isDev,
      productionTip: true
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    // babel: { 'plugins': ['@babel/plugin-proposal-optional-chaining'] },
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
