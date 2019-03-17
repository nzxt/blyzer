/* eslint-disable */
import qs from 'qs'
export default class ApiService {
  constructor(ctx) {
    this.$axios = ctx.$axios
    this.$domain = ctx.baseURL
  }
  request(method, url, body, queryParameters, form, config) {
    method = method.toLowerCase()
    let keys = Object.keys(queryParameters)
    let queryUrl = url
    if (keys.length > 0) {
      queryUrl = url + '?' + qs.stringify(queryParameters)
    }
    if (body) {
      return this.$axios[method](queryUrl, body, config)
    } else if (method === 'get') {
      return this.$axios[method](queryUrl, config)
    } else {
      return this.$axios[method](queryUrl, qs.stringify(form), config)
    }
  }
  /*==========================================================
   *                    Boccialyzer Web API
   ==========================================================*/
  /**
   * 
   * request: ApiValuesGet
   */
  ApiValuesGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Values'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * 
   * request: ApiValuesPost
   * @param value - 
   */
  ApiValuesPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Values'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['value'] !== undefined) {
      body = parameters['value']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * 
   * request: ApiValuesByIdGet
   * @param id - 
   */
  ApiValuesByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Values/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * 
   * request: ApiValuesByIdPut
   * @param id - 
   * @param value - 
   */
  ApiValuesByIdPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Values/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['value'] !== undefined) {
      body = parameters['value']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * 
   * request: ApiValuesByIdDelete
   * @param id - 
   */
  ApiValuesByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Values/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('delete', domain + path, body, queryParameters, form, config)
  }
}