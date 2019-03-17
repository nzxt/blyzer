import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import '@mdi/font/css/materialdesignicons.css'
import uk from 'vuetify/es5/locale/uk'
import ru from 'vuetify/es5/locale/ru'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { uk, ru },
    current: 'en'
  },
  theme: {
    primary: colors.blue.darken1,
    secondary: colors.blueGrey.darken1,
    accent: colors.pink.darken1,
    error: colors.red.darken1,
    warning: colors.deepOrange.darken1,
    info: colors.cyan.darken1,
    success: colors.green.darken1,
    backpurple: '#0022dd'
  }
})
