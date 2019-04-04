export const strict = false
/* eslint-disable */
import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { IRootState, ITournament, ITournamentType, IMatch, ITraining, IPlayer, IBox } from '../types/interfaces'

export const types = {
  SET_TOURNAMENT: 'SET_TOURNAMENT',
  SET_TOURNAMENT_TYPE: 'SET_TOURNAMENT_TYPE',
  SET_MATCH: 'SET_MATCH',
  SET_TRAINING: 'SET_TRAINING',
  SET_REDTEAM: 'SET_REDTEAM',
  SET_BLUETEAM: 'SET_BLUETEAM',
  SET_MATCHBOXES: 'SET_MATCHBOXES'
}

export interface IState {
  tournament: ITournament | null;
  tournamentType: ITournamentType | null;
  match: IMatch | null;
  training: ITraining | null;
  redTeam: IPlayer[];
  blueTeam: IPlayer[];
  matchBoxes: IBox[];
}

export const state = (): IState => ({
  tournament: null,
  tournamentType: null,
  match: null,
  training: null,
  redTeam: [],
  blueTeam: [],
  matchBoxes: []
})

export const mutations: MutationTree<IState> = {
  setTournament: (state, value: ITournament) => { state.tournament = value },
  setTournamentType: (state, value: ITournamentType) => { state.tournamentType = value },
  setMatch: (state, value: IMatch) => { state.match = value },
  setTraining: (state, value: ITraining) => { state.training = value },
  setRedTeam: (state, value: IPlayer[]) => { state.redTeam = value },
  setBlueTeam: (state, value: IPlayer[]) => { state.blueTeam = value },
  setMatchBoxes: (state, value: IBox[]) => { state.matchBoxes = value }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtClientInit (context: ActionContext<S, R>): void
}

export const actions: Actions<IState, IRootState> = {
  nuxtClientInit (store): void {
    store.dispatch('dicts/fetchCountries')
    store.dispatch('dicts/fetchTournamentTypes')
  },

  setMatchBoxes ({ state, commit }, value: IBox[]): void {
    if (!value.length) return
    for(const v of value) {
      let { matchBoxes } = state
      const index = matchBoxes.findIndex(x => x.id === v.id)
      if (index === -1 && v) {
        commit('setMatchBoxes', [...matchBoxes, v])
      } else if (v) {
        matchBoxes[index] = v
        commit('setMatchBoxes', [...matchBoxes])
      }
    }
  },

  kilTeamMatchBoxes ({state, commit }, teamColor: string): void {
    const { matchBoxes } = state
    commit('setMatchBoxes', matchBoxes.filter(x => x.teamColor !== teamColor))
  }
}

export const getters: GetterTree<IState, IRootState> = {
  getTournament: state => state.tournament,
  getMatch: state => state.match,
  getTraining: state => state.training,
  getPlayers: state => [...state.redTeam, ...state.blueTeam],
  getMatchBoxes: state => state.matchBoxes
}
