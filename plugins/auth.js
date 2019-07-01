export default ({ app, store }, redirect) => {
  const { $axios, $auth } = app

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 && $auth.strategy.name === 'local') {
      $auth.strategy.refreshTokens()
    }
  })

  $auth.onError((error, name, endpoint) => {
    console.warn(endpoint, name, error)
  })

  /* Only _actual_ login/outs (including resets) will be watched here. */
  $auth.$storage.watchState('loggedIn', (isLoggedIn) => {
    /* Follow @nuxtjs/auth workflow */
    if (isLoggedIn) {
      store.dispatch('nuxtClientInit')
      $auth.redirect('home')
    } else {
      $auth.redirect('logout')
    }

    // const indexLocalePath = app.localePath('index')
    // !isLoggedIn && redirect('301', indexLocalePath)
  })

  if (!$auth.loggedIn) return
  store.dispatch('nuxtClientInit')
  console.info(`[AUTH] Hi, ${$auth.user.userName}!`)
}
