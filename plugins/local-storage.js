// ~/plugins/localStorage.js
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      /* Option are here */
      key: 'blyzer',
      paths: [
        'dictionaries.active',
        'options.leftDrawer',
        'options.rightDrawer',
        'options.leftDrawerMini',
        'options.rightDrawerMini'
      ]
    })(store)
  })
}
