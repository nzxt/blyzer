import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
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
    primary: colors.lightBlue.base,
    secondary: colors.blueGrey.base,
    accent: colors.pink.base,
    error: colors.red.base,
    warning: colors.deepOrange.base,
    info: colors.cyan.base,
    success: colors.green.base,
    backpurple: '#0022dd'
  }
})
