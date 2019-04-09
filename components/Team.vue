<template lang="pug">
  //- :color='teamColor === "red" ? "error lighten-5" : "primary lighten-5"'
  v-card(dark class='lighten-2' :class='teamColor === "red" ? "red-team" : "blue-team"' :color='teamColor === "red" ? "error" : "primary"')
    v-card-title.py-1.title.font-weight-thin.justify-end(
      :class='teamColor === "red" ? "error--text" : "primary--text"'
    ) {{ teamColor === "red" ? "RED" : "BLUE" }}
    v-divider
    v-card-text.pa-1
      v-combobox.mb-2(
        dense
        v-for='mb in teamMatchBoxes'
        :key='mb.id'
        v-model='mb.player'
        :items='fetchedPlayers'
        :color='teamColor === "red" ? "warning darken-1" : "info darken-1"'
        placeholder='Player name'
        :prepend-icon='`mdi-numeric-${mb.id}-box-outline`'
        :search-input.sync='search[`${mb.id}`]'
        item-text='fullName'
        item-value='id'
        hide-details
        hide-no-data
        hide-selected
        :rules='requiredField'
        clearable
      )
        // :label='`${mb.player ? `Classification: BC${mb.player.playerClassification+1}` : ""}`'
        //- :hide-details='!!mb.player'
        //- :persistent-hint='!mb.player'
        //- :hint='tournamentName ? `Type: <span class="body-2">${tournamentTypes.find(x => x.value === tournamentType).name}</span>` : "Choose or enter tournament name..."'
        template(v-slot:selection='{ item, index }')
          v-chip(small)
            v-avatar
              flag(:iso='countryById(item.countryId).alpha2', :title='countryById(item.countryId).name')
            div {{ item.fullName }} / BC{{item.playerClassification+1}}
        template(v-slot:item='{ index, item }')
          v-list-tile-avatar
            v-avatar
              flag(:iso='countryById(item.countryId).alpha2', :title='countryById(item.countryId).name')
          v-list-tile-content
            div {{ item.fullName }}
          v-list-tile-action
            div.body-2 BC{{item.playerClassification+1}}
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { Mutation, Action, Getter, namespace } from 'vuex-class'
import { AsyncComputed } from '~/utils/decorators'
import { IBox, IPlayer, ICountry } from '~/types/interfaces' // eslint-disable-line

import GlobalMixins from '~/mixins/global'
import ValidateRules from '~/mixins/validate'
import { pick } from '~/utils/helpers'

import enums from '~/assets/enums'

import * as dicts from '~/store/dicts'
const Dicts = namespace(dicts.name)

@Component({
  mixins: [GlobalMixins, ValidateRules]
})
export default class Team extends Vue {
  $api
  search: string[] = []
  teamMatchBoxes: Array<IBox> = []

  @Prop({ default: 'grey' }) readonly teamColor!: string
  @Prop({ default: 'individual' }) readonly competitionType!: string
  @Prop({ default: 0 }) readonly competitionEvent!: number

  @Getter('getMatchBoxes') getterGetMatchBoxes
  @Getter('getPlayers') getterGetPlayers
  @Dicts.State('countries') dictsStateCountries
  // @Dicts.Action('fetchCountries') dictsActionFetchCountries

  @Action('setMatchBoxes') actionSetMatchBoxes
  @Action('kilTeamMatchBoxes') actionKilTeamMatchBoxes
  @Mutation('setRedTeam') mutationSetRedTeam
  @Mutation('setBlueTeam') mutationSetBlueTeam

  get boxes (): IBox[] {
    switch (this.competitionType) {
    case 'individual': return enums.competitionBoxes.individual
    case 'pair': return enums.competitionBoxes.pair
    case 'team': return enums.competitionBoxes.team
    default: return enums.competitionBoxes.individual
    }
  }

  @Watch('boxes', { immediate: true, deep: true })
  onChangeBoxes (value: IBox[]) {
    if (!value.length) return
    this.teamMatchBoxes = value.filter(x => x.teamColor === this.teamColor)
  }

  @Watch('teamMatchBoxes', { immediate: true, deep: true })
  onChangeTeamMatchBoxes (value: IBox[]): void {
    if (!value.length) return
    const team = value.reduce((players: IPlayer[], matchBox: IBox) => {
      if (matchBox.player) {
        const _player = { ...matchBox.player, boxId: matchBox.id }
        players.push(_player)
      }
      return players
    }, [])

    this.teamColor === 'red' ? this.mutationSetRedTeam(team) : this.mutationSetBlueTeam(team)
    this.actionKilTeamMatchBoxes(this.teamColor)
    this.actionSetMatchBoxes(value)
  }

  @AsyncComputed({ default: [] })
  fetchedPlayers (): IPlayer[] {
    let filter: string | undefined = ''
    let order: string | undefined = ''

    const search = this.search.find(x => !!x)
    if (search) { filter = `fullName.toUpper().Contains("${search}".toUpper())` } else return []

    const { selectedPlayersIds } = this
    if (selectedPlayersIds.length) {
      let filteredPlayersIds: string = ''
      for (let i = 0; i < selectedPlayersIds.length; i++) {
        filteredPlayersIds += `${filteredPlayersIds ? '&' : ''}` + `id!="${selectedPlayersIds[i]}"`
      }
      if (filteredPlayersIds) filter += `${filter ? '&' : ''}(${filteredPlayersIds})`
    }

    const { playerClassifications } = this
    if (playerClassifications.length) {
      let filteredPlayerClassifications: string = ''
      for (let i = 0; i < playerClassifications.length; i++) {
        filteredPlayerClassifications += `${filteredPlayerClassifications ? '|' : ''}` + `playerClassification="${playerClassifications[i]}"`
      }
      if (filteredPlayerClassifications) filter += `${filter ? '&' : ''}(${filteredPlayerClassifications})`
    }

    order = 'countryId ASC'

    filter = filter || undefined
    order = order || undefined

    return this.$api.ApiPlayerGet({ filter, order })
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'fullName', 'playerClassification', 'countryId'))
        return _items
      })
  }

  get selectedPlayersIds (): string[] {
    return this.getterGetPlayers.reduce((selectedPlayersIds: string[], player: IPlayer) => {
      selectedPlayersIds.push(player.id)
      return selectedPlayersIds
    }, [])
  }

  countryById (id): ICountry | object {
    if (!this.guidRegex.test(id)) return {}
    const country = this.dictsStateCountries.find(x => x.id === id)
    return country || {}
  }

  get playerClassifications (): number[] {
    const x = this.competitionEvent
    switch (true) {
    case (x >= 1 && x <= 4): return [x - 1]
    case (x >= 5 && x <= 6): return [2, 3]
    case (x === 7): return [0, 1]
    default: return []
    }
  }
}
</script>

<style lang="stylus">
.flag-icon
  font-size 22px
  border-radius 50%
.v-card
  border-radius: 7px;
  border 3px solid var(--v-secondary-base)
  .red-team
    border-color var(--v-warning-base)
  .blue-team
    border-color var(--v-info-base)
</style>
