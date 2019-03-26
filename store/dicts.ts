/* eslint-disable */
import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState, Country } from '../types/models'


export const types = {
  SET_COUNTRIES: 'SET_COUNTRIES'
}

export interface State {
  countries: Country[]
}

export const namespaced: boolean = true

export const name = 'dicts'

export const state = (): State => ({
  countries: []
})

export const mutations: MutationTree<State> = {
  [types.SET_COUNTRIES]: (state, value: Country[]) => { state.countries = value }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchCountries (context: ActionContext<S, R>): void
}

export const actions: Actions<State, RootState> = {
  async fetchCountries ({ commit }) {
    await this.$api.ApiCountryGet({ pageSize: 300 })
      .then(({ data }) => {
        commit(types.SET_COUNTRIES, data.items)
      })
  }
}
