export const state = () => ({
  match: {},
  training: {},
  redTeam: [],
  blueTeam: []
})

export const mutations = {
  setMatch: (state, value) => { state.match = value },
  setTraining: (state, value) => { state.training = value },
  setPlayers: (state, value) => {
    const { redTeam, blueTeam } = value
    state.redTeam = redTeam
    state.blueTeam = blueTeam
  }
}

export const actions = {
  // storeMatch ({ state, commit }, value) {
  //   commit('setMatch', value)
  // }
}

export const getters = {
  getMatch: state => state.match,
  getTraining: state => state.training
}
