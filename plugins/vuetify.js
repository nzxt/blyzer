import Vue from 'vue'
import Vuetify from 'vuetify/lib'

// import '@mdi/font/css/materialdesignicons.css'

import en from 'vuetify/es5/locale/en'
import uk from 'vuetify/es5/locale/uk'
import ru from 'vuetify/es5/locale/ru'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { en, uk, ru },
    current: 'en'
  },
  theme: {
    primary: colors.blue.darken2,
    secondary: colors.grey.darken1,
    accent: colors.teal.accent3,
    error: colors.red.darken2,
    warning: colors.amber.darken4,
    info: colors.cyan.darken1,
    success: colors.lime.accent4,
    backpurple: '#0022dd'
  },
  options: {
    customProperties: true
  }
})
