/* eslint-disable */
import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { ITraining, IPlayer, IBall, IPagination } from '~/types/interfaces'

import { pick } from '~/utils/helpers'

export const types = {
  SET_COMPONENT: 'SET_COMPONENT',
  SET_TRAINING: 'SET_TRAINING',
  SET_TRAININGS: 'SET_TRAININGS',
  SET_PLAYER: 'SET_PLAYER',
  ADD_BALL: 'ADD_BALL',
  CLEAR_BALLS: 'CLEAR_BALLS',
  SET_SHOT_BOX: 'SET_SHOT_BOX',
  SET_SHOT_TYPE: 'SET_SHOT_TYPE',
  SET_SHOT_DISTANCE: 'SET_SHOT_DISTANCE',
  CLEAR_STATE: 'CLEAR_STATE'
}

export interface State {
  component: string,
  player: IPlayer,
  training: ITraining,
  trainings: ITraining[],
  balls: IBall[],
  shotBox: number,
  shotType: number,
  shotDistance: number
}

export const namespaced: boolean = true

export const name = 'training'

export const state = (): State => ({
  component: 'Results',
  player: null,
  training: null,
  trainings: [],
  balls: [],
  shotBox: null,
  shotType: null,
  shotDistance: null
})

export const mutations: MutationTree<State> = {
  [types.SET_COMPONENT]: (state, value: string) => { state.component = value },
  [types.SET_PLAYER]: (state, value: IPlayer) => { state.player = value },
  [types.SET_TRAINING]: (state, value: ITraining) => { state.training = value },
  [types.SET_TRAININGS]: (state, value: ITraining[]) => { state.trainings = value },
  [types.ADD_BALL]: (state, value: IBall) => { state.balls.push(value) },
  [types.CLEAR_BALLS]: (state) => { state.balls = [] },
  [types.SET_SHOT_BOX]: (state, value: number) => { state.shotBox = value },
  [types.SET_SHOT_TYPE]: (state, value: number) => { state.shotType = value },
  [types.SET_SHOT_DISTANCE]: (state, value: number) => { state.shotDistance = value },
  [types.CLEAR_STATE]: (state) => {
    state.component = 'Results'
    state.player = null
    state.training = null
    state.balls = []
    state.shotType = null
    state.shotDistance = null
  }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchTrainingById (context: ActionContext<S, R>, id: string): void
  fetchTrainings (context: ActionContext<S, R>, pagination: IPagination): void
}
export const actions: any = {
  async fetchTrainingById ({ commit }, id) {
    await this.$api.ApiTrainingByIdGet({ id })
      .then(({ data }) => {
        const _item = pick(data, 'id', 'dateTimeStamp', 'trainingType', 'rate', 'appUserId')
        commit(types.SET_TRAINING, _item)
      })
  },

  async fetchTrainings ({ commit }, { page: pageNumber, rowsPerPage: pageSize,  }) {
    await this.$api.ApiTrainingGet({ pageNumber, pageSize })
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'dateTimeStamp', 'trainingType', 'rate', 'appUserId'))
        commit(types.SET_TRAININGS, _items)
      })
  },
}
