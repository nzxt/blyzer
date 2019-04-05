import Vue from 'vue'
import moment from 'moment'
import { trimArray } from '~/utils/helpers'
// import { IObj } from '~/types/interfaces'
// import _ from 'lodash'
// import enums from '~/assets/enums'
const enums = require('~/assets/enums')

export default ({ store, app }) => {
  const filters = {
    enumTextByValue: (value, name) => {
      const enumObj = enums[name].find(x => x.value === value)
      return enumObj ? enumObj.text : value
    },

    enumTextById: (id, name) => {
      const enumObj = enums[name].find(x => x.id === id)
      return enumObj ? enumObj.text : id
    },

    enumTextByIdFlatten: (id, name) => {
      const enumsFlatten = []
      for (const key of Object.keys(enums[name])) {
        enumsFlatten.push(...enums[name][key])
      }
      trimArray(enumsFlatten, 'id')
      const enumObj = enumsFlatten.find(x => x.id === id)
      return enumObj ? enumObj.text : id
    },

    enumTextByIdSub: (id, name, key) => {
      const enumObj = enums[name][key].find(x => x.id === id)
      return enumObj ? enumObj.text : id
    },

    tryGetInitials: (fullName) => {
      if (!fullName) return
      const nameParts = fullName.split(' ')
      if (nameParts) {
        if (nameParts.length === 3) {
          return `${nameParts[0]} ${nameParts[1][0]}.${nameParts[2][0]}.`
        } else if (nameParts.length === 2) {
          return `${nameParts[0]} ${nameParts[1][0]}.`
        }
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
        ? utcDate.format('DD.MM.YYYY / HH:mm')
        : '--.--.---- --:--'
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

    dateUTCToDate: (date) => {
      return (date && moment(date).isValid()) ? moment(date).format('DD.MM.YYYY') : date
    },

    dateUTCToTime: (date) => {
      return (date && moment(date).isValid()) ? moment(date).format('HH:mm') : date
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
