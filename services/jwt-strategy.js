const DEFAULTS = {
  tokenType: 'Bearer',
  tokenName: 'Authorization',
  tokenKey: 'accessToken',
  refreshTokenKey: 'refreshToken',
  globalToken: true
}

export default class JwtScheme {
  constructor (auth, options) {
    this.$auth = auth
    this.name = options._name

    this.options = Object.assign({}, DEFAULTS, options)
  }

  mounted () {
    // Sync token
    const token = this.$auth.syncToken(this.name)

    // Set axios token
    if (token) {
      this._setToken(token)
    }

    return this.$auth.fetchUserOnce()
  }

  _setToken (token) {
    if (this.options.globalToken) {
      // Set Authorization token for all axios requests
      this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, token)
    }
  }

  _clearToken () {
    if (this.options.globalToken) {
      // Clear Authorization token for all axios requests
      this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, false)
      this.$auth.$storage.setLocalStorage(this.name + '.tokens', null)
    }
  }

  _storeTokens (tokens) {
    this.$auth.$storage.setLocalStorage(this.name + '.tokens', tokens, true)
  }

  _getTokens () {
    return this.$auth.$storage.getLocalStorage(this.name + '.tokens', true)
  }

  _logoutLocally () {
    this._clearToken()
    return this.$auth.reset()
  }

  async login (endpoint) {
    if (!this.options.endpoints.login) return

    // Ditch any leftover local tokens before attempting to log in
    this._logoutLocally()

    const result = await this.$auth.request(
      endpoint,
      this.options.endpoints.login
    )

    if (!result) return

    // Store full log in response object to LocalStorage
    this._storeTokens(result)

    const token = this.options.tokenType
      ? `${this.options.tokenType} ${result[this.options.tokenKey || 'access_token']}`
      : result[this.options.tokenKey || 'access_token']

    if (token) {
      this.$auth.setToken(this.name, token)
      this._setToken(token)
    }

    const refreshToken = result[this.options.refreshTokenKey || 'refresh_token']

    if (refreshToken) {
      this.$auth.setRefreshToken(this.name, refreshToken)
    }

    return this.fetchUser()
  }

  async fetchUser (endpoint) {
    if (!this.$auth.getToken(this.name)) {
      return
    }

    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )

    this.$auth.setUser(user)
  }

  async logout (endpoint) {
    // Only connect to logout endpoint if it's configured
    if (this.options.endpoints.logout) {
      await this.$auth.requestWith(
        this.name,
        endpoint,
        this.options.endpoints.logout
      )
        .catch(error => console.log(error))
    }
    // But logout locally regardless
    return this._logoutLocally()
  }

  async refreshTokens () {
    const tokens = this._getTokens()

    if (!tokens) return

    // const token = this.$auth.syncToken(this.name)
    // const refreshToken = this.$auth.syncRefreshToken(this.name)

    // if (!token || !refreshToken) return

    // const regex = new RegExp(`^${this.options.tokenType || 'Bearer'}\\s`)
    // const accessToken = token.replace(regex, '')

    const endpoint = {
      data: tokens
      // data: {
      //   [this.options.tokenKey]: accessToken,
      //   [this.options.refreshTokenKey]: refreshToken,
      //   expiresIn: 60
      // }
    }
    const result = await this.$auth.request(
      endpoint,
      this.options.endpoints.refresh
    )

    if (!result) return

    this._storeTokens(result)

    const newToken = this.options.tokenType
      ? `${this.options.tokenType} ${result[this.options.tokenKey || 'access_token']}`
      : result[this.options.tokenKey || 'access_token']

    if (newToken) {
      this.$auth.setToken(this.name, newToken)
      this._setToken(newToken)
    }

    const newRefreshToken = result[this.options.refreshTokenKey || 'refresh_token']

    if (newRefreshToken) {
      this.$auth.setRefreshToken(this.name, newRefreshToken)
    }

    return this.$auth.fetchUserOnce()
  }
}
