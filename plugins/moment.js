// import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
// import 'moment/locale/ru'  // without this line it didn't work
// moment.locale('ru')


export default ({ app }, inject) => {
  momentDurationFormatSetup(app.$moment)
  // inject('moment', moment)
}
