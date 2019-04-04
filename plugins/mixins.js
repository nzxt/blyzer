// import Vue from 'vue'

// Vue.mixin({
//   data () {
//     return {
//       guidRegex: /^[{(]?[0-9a-f]{8}[-]?([0-9a-f]{4}[-]?){3}[0-9a-f]{12}[)}]?$/
//       // enums: require('~/assets/enums').default
//     }
//   },

//   methods: {
//     camelToKebab: string => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),

//     countryById: (id) => {
//       if (!this.guidRegex.test(id)) return
//       return this.$api.ApiCountryByIdGet({ id })
//         .then(({ data }) => {
//           return data
//         })
//         .catch((e) => {
//           console.log(e)
//           return {}
//         })
//     },

//     tryGetInitials: (fullName) => {
//       if (!fullName) return

//       const nameParts = fullName.split(' ')
//       if (nameParts && nameParts.length === 3) { return `${nameParts[0]} ${nameParts[1][0]}.${nameParts[2][0]}.` }

//       return fullName
//     }
//   }
// })
