/* eslint-disable */
import { MutationTree } from 'vuex'
import { ITraining, IPlayer, IBall } from '~/types/interfaces'

export const types = {
  SET_COMPONENT: 'SET_COMPONENT',
  SET_TRAINING: 'SET_TRAINING',
  SET_PLAYER: 'SET_PLAYER',
  ADD_BALL: 'ADD_BALL',
  SET_SHOT_TYPE: 'SET_SHOT_TYPE',
  SET_SHOT_DISTANCE: 'SET_SHOT_DISTANCE',
  CLEAR_STATE: 'CLEAR_STATE'
}

export interface State {
  component: string,
  player: IPlayer,
  training: ITraining,
  balls: IBall[],
  shotType: number,
  shotDistance: number
}

export const namespaced: boolean = true

export const name = 'training'

export const state = (): State => ({
  component: 'Results',
  player: null,
  training: null,
  balls: [],
  shotType: null,
  shotDistance: null
})

export const mutations: MutationTree<State> = {
  [types.SET_COMPONENT]: (state, value: string) => { state.component = value },
  [types.SET_PLAYER]: (state, value: IPlayer) => { state.player = value },
  [types.SET_TRAINING]: (state, value: ITraining) => { state.training = value },
  [types.ADD_BALL]: (state, value: IBall) => { state.balls.push(value) },
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
