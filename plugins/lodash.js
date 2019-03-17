import lodash from 'lodash'

export default ({ app }, inject) => {
  inject('_', lodash)
}
