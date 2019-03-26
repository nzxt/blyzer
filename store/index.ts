/* eslint-disable */
import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from '../types/models'

export const types = {
  SET_MATCH: 'SET_MATCH',
  SET_TRAINING: 'SET_TRAINING',
  SET_PLAYERS: 'SET_PLAYERS',
  SET_MATCHBOXES: 'SET_MATCHBOXES'
}

export interface State {
  match: any;
  training: any;
  redTeam: Array<any>;
  blueTeam: Array<any>;
  matchBoxes: Array<any>;
}

export const state = (): State => ({
  match: {},
  training: {},
  redTeam: [],
  blueTeam: [],
  matchBoxes: []
})

export const mutations: MutationTree<State> = {
  setMatch: (state, value: any) => { state.match = value },
  setTraining: (state, value: any) => { state.training = value },
  setPlayers: (state, value: any) => {
    const { redTeam, blueTeam } = value
    state.redTeam = redTeam
    state.blueTeam = blueTeam
  },
  setMatchBoxes: (state, value) => {
    state.matchBoxes = value
  }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtClientInit (context: ActionContext<S, R>): void
}

export const actions: Actions<State, RootState> = {
  nuxtClientInit (store) {
    debugger
    store.dispatch('dicts/fetchCountries')
  }
}

export const getters: GetterTree<State, RootState> = {
  getMatch: state => state.match,
  getTraining: state => state.training
}
