import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AuthMixin extends Vue {
  // $api
  guidRegex: any = /^[{(]?[0-9a-f]{8}[-]?([0-9a-f]{4}[-]?){3}[0-9a-f]{12}[)}]?$/

  // async countryById (id: string) {
  //   if (!this.guidRegex.test(id)) return

  //   const data = await this.$api.ApiCountryByIdGet({ id })
  //     .then(({ data }) => {
  //       return data
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //       return {}
  //     })
  //   return data.alpha2
  // }
}
