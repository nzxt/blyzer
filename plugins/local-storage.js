// ~/plugins/localStorage.js
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      /* Option are here */
      key: 'blyzer',
      paths: [
        'dicts',
        'training'
      ]
    })(store)
  })
}
