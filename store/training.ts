/* eslint-disable */
import { MutationTree } from 'vuex'
// import { ActionContext, ActionTree, MutationTree } from 'vuex'
// import { IRootState, ICountry, ITournamentType, IApiService } from '~/types/interfaces'
import { ITraining, IBall } from '~/types/interfaces'
// import { pick } from '~/utils/helpers';

export const types = {
  SET_COMPONENT: 'SET_COMPONENT',
  SET_TRAINING: 'SET_TRAINING',
  // SET_BALL: 'SET_BALL',
  ADD_BALL: 'ADD_BALL',
  SET_SHOT_TYPE: 'SET_SHOT_TYPE',
  CLEAR_STATE: 'CLEAR_STATE'
}

export interface State {
  component: string,
  training: ITraining,
  balls: IBall[],
  shotType: number
}

export const namespaced: boolean = true

export const name = 'training'

export const state = (): State => ({
  component: 'Initial',
  training: null,
  balls: [],
  shotType: null
})

export const mutations: MutationTree<State> = {
  [types.SET_COMPONENT]: (state, value: string) => { state.component = value },
  [types.SET_TRAINING]: (state, value: ITraining) => { state.training = value },
  [types.ADD_BALL]: (state, value: IBall) => { state.balls.push(value) },
  [types.SET_SHOT_TYPE]: (state, value: number) => { state.shotType = value },
  [types.CLEAR_STATE]: (state) => {
    state.component = 'Initial'
    state.training = null
    state.balls = []
    state.shotType = null
  }

}

// export interface Actions<S, R> extends ActionTree<S, R> {
//   fetchCountries (context: ActionContext<S, R>): void
//   fetchTournamentTypes (context: ActionContext<S, R>): void
// }

// export const actions: Actions<State, IRootState> = {
// export const actions: any = {
//   async fetchCountries ({ commit }) {
//     await this.$api.ApiCountryGet({ pageSize: 300 })
//       .then(({ data: { items } }) => {
//         const _items = items.map(x => pick(x, 'id', 'name', 'code', 'alpha2', 'alpha3'))
//         commit(types.SET_COUNTRIES, _items)
//       })
//   },

//   async fetchTournamentTypes ({ commit }) {
//     await this.$api.ApiTournamentTypeGet()
//       .then(({ data: { items } }) => {
//         const _items = items.map(x => pick(x, 'id', 'name', 'abbr', 'isBisFed', 'icon'))
//         commit(types.SET_TOURNAMENT_TYPES, _items)
//       })
//   }
// }
