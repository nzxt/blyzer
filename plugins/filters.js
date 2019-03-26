import Vue from 'vue'
import moment from 'moment'
// import _ from 'lodash'
// const enums = require('~/assets/enums').default

export default ({ store, app }) => {
  const filters = {
    tryGetInitials: (fullName) => {
      if (!fullName) return
      const nameParts = fullName.split(' ')
      if (nameParts && nameParts.length === 3) {
        return `${nameParts[0]} ${nameParts[1][0]}.${nameParts[2][0]}.`
      }
      return fullName
    },

    phoneNumber (number) {
      if (!number) return
      const phone = number.replace(/(\d{2}|\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5')
      return phone
    },

    dateUTCToFull: (date) => {
      if (!date) return '--.--.---- --:--:--'
      const utcDate = moment(date)
      return utcDate.isValid()
        ? utcDate.format('DD.MM.YYYY / HH:mm:ss')
        : '--.--.---- --:--:--'
    },

    dateUTCToShort: (date) => {
      if (!date) return
      const shortDate = moment(date, 'DD.MM.YYYY', true)
      if (shortDate.isValid()) {
        date = shortDate
      } else {
        date = moment(date)
      }
      if (date.isValid()) return date.format('DD.MM.YYYY')
    },

    dateUTCToSmall: (date) => {
      if (!date) return
      const shortDate = moment(date, 'MM.YY', true)
      if (shortDate.isValid()) {
        date = shortDate
      } else {
        date = moment(date)
      }
      if (date.isValid()) return date.format('MM.YY')
    },

    duration: (seconds) => {
      if (!seconds) return '--:--'
      let duration = moment.duration(seconds, 'seconds').format('HH:mm:ss')
      if (duration.length === 1) {
        duration = `00:0${duration}`
      } else if (duration.length === 2) {
        duration = `00:${duration}`
      }
      return duration
    },

    daysPassed: (date) => {
      if (!date) return
      const now = moment(new Date()) // todays date
      const end = moment(date) // another date
      const duration = moment.duration(now.diff(end))
      const days = Math.floor(duration.asDays())
      return days
    },

    daysRemaining: (date) => {
      if (!date) return
      const now = moment(new Date()) // todays date
      const end = moment(date) // another date
      const duration = moment.duration(end.diff(now))
      const days = Math.floor(duration.asDays())
      return days > 0 ? days : 0
    }
  }

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      Vue.filter(key, filters[key])
    }
  }
}

/*
Vue.filter('currencyDisplay', {
  // model -> view
  // formats the value when updating the input element.
  read: function(val) {
    return '$'+val.toFixed(2)
  },
  // view -> model
  // formats the value when writing to the data.
  write: function(val, oldVal) {
    var number = +val.replace(/[^\d.]/g, '')
    return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
  }
})
*/
