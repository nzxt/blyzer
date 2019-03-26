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
    primary: colors.blue.darken3,
    secondary: colors.grey.darken1,
    accent: colors.pink.darken1,
    error: colors.red.darken3,
    warning: colors.deepOrange.darken1,
    info: colors.cyan.darken1,
    success: colors.green.darken1,
    backpurple: '#0022dd'
  },
  options: {
    customProperties: true
  }
})
