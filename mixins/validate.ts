import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ValidateRules extends Vue {
  requiredField: Array<Function> = [
    value => !!value || '* This field is required'
  ]
  minLength: Array<Function> = [
    value => (!!value && value.length > 3) || 'Length too short'
  ]
}
