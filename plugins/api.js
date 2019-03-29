import ApiService from '~/services/api'

export default ({ $axios }, inject) => {
  const Api = new ApiService({ $axios })

  inject('api', Api)
}
