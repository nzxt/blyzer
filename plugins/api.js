import ApiService from '~/services/api'

export default ({ $axios, env: { API_URL } }, inject) => {
  const Api = new ApiService({ $axios, baseURL: API_URL })

  inject('api', Api)
}
