/* eslint-disable */
import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState, ITournament, Match, ITraining, Player, Box } from '../types/interfaces'

export const types = {
  SET_TOURNAMENT: 'SET_TOURNAMENT',
  SET_MATCH: 'SET_MATCH',
  SET_TRAINING: 'SET_TRAINING',
  SET_REDTEAM: 'SET_REDTEAM',
  SET_BLUETEAM: 'SET_BLUETEAM',
  SET_MATCHBOXES: 'SET_MATCHBOXES'
}

export interface State {
  tournament: ITournament | object | null;
  match: Match | object;
  training: ITraining | object;
  redTeam: Player[];
  blueTeam: Player[];
  matchBoxes: Box[];
}

export const state = (): State => ({
  tournament: null,
  match: {},
  training: {},
  redTeam: [],
  blueTeam: [],
  matchBoxes: []
})

export const mutations: MutationTree<State> = {
  setTournament: (state, value: ITournament) => { state.tournament = value },
  setMatch: (state, value: Match) => { state.match = value },
  setTraining: (state, value: ITraining) => { state.training = value },
  setRedTeam: (state, value: Player[]) => { state.redTeam = value },
  setBlueTeam: (state, value: Player[]) => { state.blueTeam = value },
  setMatchBoxes: (state, value: Box[]) => { state.matchBoxes = value }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtClientInit (context: ActionContext<S, R>): void
}

export const actions: Actions<State, RootState> = {
  nuxtClientInit (store) {
    store.dispatch('dicts/fetchCountries')
    store.dispatch('dicts/fetchTournamentTypes')
  }
}

export const getters: GetterTree<State, RootState> = {
  getTournament: state => state.tournament,
  getMatch: state => state.match,
  getTraining: state => state.training
}
