export default ({ app, store }, redirect) => {
  const { $auth } = app

  $auth.onError((error, name, endpoint) => {
    console.error(endpoint, name, error)
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
  console.log(`[AUTH] Hi, ${$auth.user.userName}!`)
}
