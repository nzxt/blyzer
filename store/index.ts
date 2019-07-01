/* eslint-disable */
import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { IRootState, ITournament, ITournamentType, IMatch, IStage, ITraining, IPlayer, IBox, IBall } from '../types/interfaces'
/* eslint-enable */

import { pick } from '~/utils/helpers'

export const strict = false

export const types = {
  SET_MY_PLAYER: 'SET_MY_PLAYER',
  SET_TOURNAMENT: 'SET_TOURNAMENT',
  SET_TOURNAMENT_TYPE: 'SET_TOURNAMENT_TYPE',
  SET_MATCH: 'SET_MATCH',
  SET_STAGE: 'SET_STAGE',
  SET_TRAINING: 'SET_TRAINING',
  SET_REDTEAM: 'SET_REDTEAM',
  SET_BLUETEAM: 'SET_BLUETEAM',
  SET_MATCHBOXES: 'SET_MATCHBOXES',
  SET_COMPONENT: 'SET_COMPONENT'
}

export interface IState {
  myPlayer: IPlayer;
  tournament: ITournament;
  tournamentType: ITournamentType;
  match: IMatch;
  stage: IStage;
  training: ITraining;
  redTeam: IPlayer[];
  blueTeam: IPlayer[];
  matchBoxes: IBox[];
  component: string;
}

export const state = (): IState => ({
  myPlayer: null,
  tournament: null,
  tournamentType: {
    id: '1c34cfbb-840c-42dc-a4b4-9028e39193b0',
    name: 'General Tourney',
    abbr: 'GT',
    icon: 'mdi-triforce'
  },
  match: null,
  stage: {
    index: 0,
    matchId: '',
    balls: []
  },
  training: null,
  redTeam: [],
  blueTeam: [],
  matchBoxes: [],
  component: null
})

export const mutations: MutationTree<IState> = {
  setMyPlayer: (state, value: IPlayer) => { state.myPlayer = value },
  setTournament: (state, value: ITournament) => { state.tournament = value },
  setTournamentType: (state, value: ITournamentType) => { state.tournamentType = value },
  setMatch: (state, value: IMatch) => { state.match = value },
  setTraining: (state, value: ITraining) => { state.training = value },
  setStage: (state, value: IStage) => { state.stage = value },
  setRedTeam: (state, value: IPlayer[]) => { state.redTeam = value },
  setBlueTeam: (state, value: IPlayer[]) => { state.blueTeam = value },
  setMatchBoxes: (state, value: IBox[]) => { state.matchBoxes = value },
  setComponent: (state, value: string | null) => { state.component = value },
  addMatchStage: (state, value: IStage) => { state.match.stages.push(value) },
  addStageBall: (state, value: IBall) => { state.stage.balls.push(value) }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtClientInit (context: ActionContext<S, R>): void
  fetchAuthPlayer ({ state, dispatch }): any
  fetchMyPlayerById ({ commit }, id: string): any
  setMatchBoxes ({ state, commit }, value: IBox[]): void
  killTeamMatchBoxes ({ state, commit }, teamColor: string): void
}

export const actions: Actions<IState, IRootState> = {
  nuxtClientInit (store): void {
    store.dispatch('fetchAuthPlayer')
    store.dispatch('dicts/fetchPlayers')
    store.dispatch('dicts/fetchCountries')
    store.dispatch('dicts/fetchTournamentTypes')
  },

  async fetchAuthPlayer ({ state, dispatch }) {
    const { appUserId } = state.auth.user
    if (!appUserId) return

    const playerId =
      await (this.$api as any).ApiAppUserByIdGet({ id: appUserId })
        .then(({ data }) => data.playerId)
    if (!playerId) return

    await dispatch('fetchMyPlayerById', playerId)
  },

  async fetchMyPlayerById ({ commit }, id: string) {
    if (!id) return

    await (this.$api as any).ApiPlayerByIdGet({ id })
      .then(({ data }) => {
        const _item = pick(data, 'id', 'fullName', 'playerClassification', 'countryId', 'isBisFed')
        commit('setMyPlayer', _item)
      })
  },

  setMatchBoxes ({ state, commit }, value: IBox[]): void {
    if (!value.length) return
    for (const v of value) {
      const { matchBoxes } = state
      const index = matchBoxes.findIndex(x => x.id === v.id)
      if (index === -1 && v) {
        commit('setMatchBoxes', [...matchBoxes, v])
      } else if (v) {
        matchBoxes[index] = v
        commit('setMatchBoxes', [...matchBoxes])
      }
    }
  },

  killTeamMatchBoxes ({ state, commit }, teamColor: string): void {
    const { matchBoxes } = state
    commit('setMatchBoxes', matchBoxes.filter(x => x.teamColor !== teamColor))
  }
}

export const getters: GetterTree<IState, IRootState> = {
  getTournament: state => state.tournament,
  getMatch: state => state.match,
  getTraining: state => state.training,
  getMatchToPlayers: state => [...state.redTeam, ...state.blueTeam],
  getComponent: state => state.component
}
