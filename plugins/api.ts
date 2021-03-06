import ApiService from '~/services/api'
import { IApiService } from '~/types/interfaces' // eslint-disable-line

export default ({ $axios }, inject): void => {
  const Api: IApiService = new ApiService({ $axios })

  inject('api', Api)
}
