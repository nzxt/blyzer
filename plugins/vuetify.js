import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import '@mdi/font/css/materialdesignicons.css'
// import uk from 'vuetify/es5/locale/uk'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  // lang: {
  //   locales: { uk },
  //   current: 'uk'
  // },
  theme: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})
