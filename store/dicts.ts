/* eslint-disable */
import { ActionContext, ActionTree, MutationTree } from 'vuex'
// import { IRootState, ICountry, ITournamentType, IApiService } from '~/types/interfaces'
import { ICountry, ITournamentType } from '~/types/interfaces'
import { pick } from '~/utils/helpers';

export const types = {
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_TOURNAMENT_TYPES: 'SET_TOURNAMENT_TYPES'
}

export interface State {
  countries: ICountry[],
  tournamentTypes: ITournamentType[],
}

export const namespaced: boolean = true

export const name = 'dicts'

export const state = (): State => ({
  countries: [],
  tournamentTypes: []
})

export const mutations: MutationTree<State> = {
  [types.SET_COUNTRIES]: (state, value: ICountry[]) => { state.countries = value },
  [types.SET_TOURNAMENT_TYPES]: (state, value: ITournamentType[]) => { state.tournamentTypes = value }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchCountries (context: ActionContext<S, R>): void
  fetchTournamentTypes (context: ActionContext<S, R>): void
}

// export const actions: Actions<State, IRootState> = {
export const actions: any = {
  async fetchCountries ({ commit }) {
    await this.$api.ApiCountryGet({ pageSize: 300 })
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'name', 'code', 'alpha2', 'alpha3'))
        commit(types.SET_COUNTRIES, _items)
      })
  },

  async fetchTournamentTypes ({ commit }) {
    await this.$api.ApiTournamentTypeGet()
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'name', 'abbr', 'isBisFed', 'icon'))
        commit(types.SET_TOURNAMENT_TYPES, _items)
      })
  }
}
