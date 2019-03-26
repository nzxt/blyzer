import ApiService from '~/services/api'

export default ({ $axios, env: { BASE_URL } }, inject) => {
  const Api = new ApiService({ $axios, BASE_URL })

  inject('api', Api)
}
