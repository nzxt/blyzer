/* eslint-disable */
import { ActionContext, ActionTree, MutationTree } from 'vuex'
// import { IRootState, ICountry, ITournamentType, IApiService } from '~/types/interfaces'
import { ICountry, IPlayer, ITournamentType } from '~/types/interfaces'
import { pick } from '~/utils/helpers';

export const types = {
  SET_PLAYERS: 'SET_PLAYERS',
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_TOURNAMENT_TYPES: 'SET_TOURNAMENT_TYPES'
}

export interface State {
  players: IPlayer[],
  countries: ICountry[],
  tournamentTypes: ITournamentType[],
}

export const namespaced: boolean = true

export const name = 'dicts'

export const state = (): State => ({
  players: [],
  countries: [],
  tournamentTypes: []
})

export const mutations: MutationTree<State> = {
  [types.SET_PLAYERS]: (state, value: IPlayer[]) => { state.players = value },
  [types.SET_COUNTRIES]: (state, value: ICountry[]) => { state.countries = value },
  [types.SET_TOURNAMENT_TYPES]: (state, value: ITournamentType[]) => { state.tournamentTypes = value }
}

export interface Actions<S, R> extends ActionTree<S, R> {
  fetchPlayers (context: ActionContext<S, R>): void
  fetchCountries (context: ActionContext<S, R>): void
  fetchTournamentTypes (context: ActionContext<S, R>): void
}

// export const actions: Actions<State, IRootState> = {
export const actions: any = {
  async fetchPlayers ({ commit }) {
    await this.$api.ApiPlayerGet({ pageSize: 1000 })
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'fullName', 'playerClassification', 'countryId', 'isBisFed'))
        commit(types.SET_PLAYERS, _items)
      })
  },

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
