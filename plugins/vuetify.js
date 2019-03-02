import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import uk from 'vuetify/es5/locale/uk'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { uk },
    current: 'uk'
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
