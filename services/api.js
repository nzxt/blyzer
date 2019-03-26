/* eslint-disable */
import qs from 'qs'
export default class ApiService {
  constructor(ctx) {
    this.$axios = ctx.$axios
    this.$domain = ctx.BASE_URL
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
   * Авторизація користувача
   * request: ApiAccountLoginPost
   * @param loginModel - Модель авторизації
   */
  ApiAccountLoginPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Account/Login'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['loginModel'] !== undefined) {
      body = parameters['loginModel']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Вихід з системи
   * request: ApiAccountLogoutGet
   */
  ApiAccountLogoutGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Account/Logout'
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
   * Отримати профіль користувача
   * request: ApiAccountGetProfileGet
   */
  ApiAccountGetProfileGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Account/GetProfile'
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
   * Реєстрація нового користувача
   * request: ApiAccountRegistrationPost
   * @param item - Модель реєстрації
   */
  ApiAccountRegistrationPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Account/Registration'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати список (пагінація)
   * request: ApiAppRoleGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiAppRoleGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppRole'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiAppRolePut
   * @param item - Об'єкт
   */
  ApiAppRolePut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppRole'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiAppRolePost
   * @param item - Новий об'єкт
   */
  ApiAppRolePost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppRole'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiAppRoleByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiAppRoleByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppRole/{id}'
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
   * Отримати ідентифікатор ролі за замовчуванням
   * request: ApiAppRoleGetDefaultGet
   */
  ApiAppRoleGetDefaultGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppRole/GetDefault'
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
   * Отримати список (пагінація)
   * request: ApiAppUserGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiAppUserGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppUser'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати користувача
   * request: ApiAppUserPut
   * @param item - Користувач
   */
  ApiAppUserPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppUser'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiAppUserPost
   * @param item - Модель реєстрації
   */
  ApiAppUserPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppUser'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiAppUserByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiAppUserByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppUser/{id}'
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
   * Видалити запис
   * request: ApiAppUserByIdDelete
   * @param id - Ідентифікатор
   */
  ApiAppUserByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppUser/{id}'
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
  /**
   * Призначити ролі користувачу
   * request: ApiAppUserSetRolesPost
   * @param rolesModel - Модель для додавання ролей користувачу
   */
  ApiAppUserSetRolesPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppUser/SetRoles'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['rolesModel'] !== undefined) {
      body = parameters['rolesModel']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Встановити новий пароль
   * request: ApiAppUserSetPassPost
   * @param userId - Ідентифікатор користувача
   * @param pass - Новий пароль
   */
  ApiAppUserSetPassPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/AppUser/SetPass'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['userId'] !== undefined) {
      queryParameters['userId'] = parameters['userId']
    }
    if (parameters['pass'] !== undefined) {
      queryParameters['pass'] = parameters['pass']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати список (пагінація)
   * request: ApiBallGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiBallGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Ball'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiBallPut
   * @param item - Об'єкт
   */
  ApiBallPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Ball'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiBallPost
   * @param item - Новий об'єкт
   */
  ApiBallPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Ball'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiBallByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiBallByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Ball/{id}'
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
   * Видалити запис
   * request: ApiBallByIdDelete
   * @param id - Ідентифікатор
   */
  ApiBallByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Ball/{id}'
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
  /**
   * Отримати список (пагінація)
   * request: ApiConfigurationGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiConfigurationGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Configuration'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiConfigurationPut
   * @param item - Об'єкт
   */
  ApiConfigurationPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Configuration'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiConfigurationPost
   * @param item - Новий об'єкт
   */
  ApiConfigurationPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Configuration'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiConfigurationByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiConfigurationByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Configuration/{id}'
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
   * Видалити запис
   * request: ApiConfigurationByIdDelete
   * @param id - Ідентифікатор
   */
  ApiConfigurationByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Configuration/{id}'
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
  /**
   * Отримати список (пагінація)
   * request: ApiCountryGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiCountryGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Country'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiCountryPut
   * @param item - Об'єкт
   */
  ApiCountryPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Country'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiCountryPost
   * @param item - Новий об'єкт
   */
  ApiCountryPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Country'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiCountryByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiCountryByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Country/{id}'
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
   * Видалити запис
   * request: ApiCountryByIdDelete
   * @param id - Ідентифікатор
   */
  ApiCountryByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Country/{id}'
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
  /**
   * Отримати список (пагінація)
   * request: ApiMatchGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiMatchGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Match'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiMatchPut
   * @param item - Об'єкт
   */
  ApiMatchPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Match'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiMatchPost
   * @param item - Новий об'єкт
   */
  ApiMatchPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Match'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiMatchByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiMatchByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Match/{id}'
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
   * Видалити запис
   * request: ApiMatchByIdDelete
   * @param id - Ідентифікатор
   */
  ApiMatchByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Match/{id}'
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
  /**
   * Отримати список (пагінація)
   * request: ApiPlayerGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiPlayerGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Player'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiPlayerPut
   * @param item - Об'єкт
   */
  ApiPlayerPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Player'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiPlayerPost
   * @param item - Новий об'єкт
   */
  ApiPlayerPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Player'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiPlayerByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiPlayerByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Player/{id}'
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
   * Видалити запис
   * request: ApiPlayerByIdDelete
   * @param id - Ідентифікатор
   */
  ApiPlayerByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Player/{id}'
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
  /**
   * Отримати список (пагінація)
   * request: ApiStageGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiStageGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Stage'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiStagePut
   * @param item - Об'єкт
   */
  ApiStagePut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Stage'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiStagePost
   * @param item - Новий об'єкт
   */
  ApiStagePost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Stage'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiStageByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiStageByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Stage/{id}'
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
   * Видалити запис
   * request: ApiStageByIdDelete
   * @param id - Ідентифікатор
   */
  ApiStageByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Stage/{id}'
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
  /**
   * Отримати список (пагінація)
   * request: ApiTournamentGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiTournamentGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Tournament'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiTournamentPut
   * @param item - Об'єкт
   */
  ApiTournamentPut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Tournament'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiTournamentPost
   * @param item - Новий об'єкт
   */
  ApiTournamentPost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Tournament'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiTournamentByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiTournamentByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Tournament/{id}'
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
   * Видалити запис
   * request: ApiTournamentByIdDelete
   * @param id - Ідентифікатор
   */
  ApiTournamentByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/Tournament/{id}'
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
  /**
   * Отримати список (пагінація)
   * request: ApiTournamentTypeGet
   * @param pageNumber - Номер сторінки (за замовчуванням 1)
   * @param pageSize - Кількість записів на сторінку (за замовчуванням 25)
   * @param filter - Фільтр
   * @param order - Сортування
   */
  ApiTournamentTypeGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/TournamentType'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['pageNumber'] !== undefined) {
      queryParameters['pageNumber'] = parameters['pageNumber']
    }
    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }
    if (parameters['filter'] !== undefined) {
      queryParameters['filter'] = parameters['filter']
    }
    if (parameters['order'] !== undefined) {
      queryParameters['order'] = parameters['order']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('get', domain + path, body, queryParameters, form, config)
  }
  /**
   * Модифікувати запис
   * request: ApiTournamentTypePut
   * @param item - Об'єкт
   */
  ApiTournamentTypePut(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/TournamentType'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('put', domain + path, body, queryParameters, form, config)
  }
  /**
   * Створити новий запис
   * request: ApiTournamentTypePost
   * @param item - Новий об'єкт
   */
  ApiTournamentTypePost(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/TournamentType'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['item'] !== undefined) {
      body = parameters['item']
    }
    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName]
      });
    }
    return this.request('post', domain + path, body, queryParameters, form, config)
  }
  /**
   * Отримати деталі за ідентифікатором
   * request: ApiTournamentTypeByIdGet
   * @param id - Ідентифікатор запису
   */
  ApiTournamentTypeByIdGet(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/TournamentType/{id}'
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
   * Видалити запис
   * request: ApiTournamentTypeByIdDelete
   * @param id - Ідентифікатор
   */
  ApiTournamentTypeByIdDelete(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : this.$domain
    const config = parameters.$config
    let path = '/api/TournamentType/{id}'
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