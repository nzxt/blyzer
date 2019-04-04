import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GlobalMixin extends Vue {
  guidRegex: RegExp = new RegExp('^[{(]?[0-9a-f]{8}[-]?([0-9a-f]{4}[-]?){3}[0-9a-f]{12}[)}]?$')
  // guidRegex: any = /^[{(]?[0-9a-f]{8}[-]?([0-9a-f]{4}[-]?){3}[0-9a-f]{12}[)}]?$/g
}
