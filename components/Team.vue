<template lang="pug">
  //- :color='teamColor === "red" ? "error lighten-5" : "primary lighten-5"'
  v-card(class='lighten-2' :class='teamColor === "red" ? "red-team" : "blue-team"')
    v-card-title.py-1.title.font-weight-thin.justify-end(
      :class='teamColor === "red" ? "error--text" : "primary--text"'
    ) {{ teamColor === "red" ? "RED team" : "BLUE team" }}
    v-divider
    v-card-text.pa-1
      v-combobox.mb-2(
        dense
        v-for='mb in matchBoxes'
        :key='mb.id'
        v-model='mb.player'
        :items='fetchedPlayers'
        :prepend-icon='`mdi-numeric-${mb.id}-box-outline`'
        :label='`${mb.player ? `Classification: BC${mb.player.playerClassification+1}` : ""}`'
        :color='teamColor === "red" ? "error darken-3" : "primary darken-3"'
        :hint='`Choose player for ${mb.teamColor} box #${mb.id}`'
        :search-input.sync='search'
        item-text='fullName'
        item-value='id'
        hide-no-data
        :hide-details='!!mb.player'
        hide-selected
        :persistent-hint='!mb.player'
        :rules='requiredField'
        clearable
      )
        //- :hint='tournamentName ? `Type: <span class="body-2">${tournamentTypes.find(x => x.value === tournamentType).name}</span>` : "Choose or enter tournament name..."'
        template(v-slot:selection='{ item, index }')
          v-chip(small)
            v-avatar
              flag(:iso='countryById(item.countryId).alpha2', :title='countryById(item.countryId).name')
            div {{ item.fullName }}
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
import { State, Mutation, namespace } from 'vuex-class'
import { AsyncComputed } from '~/utils/decorators'
import { Box, Player, Country } from '~/types/interfaces' // eslint-disable-line

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
  search: string = ''
  matchBoxes: Array<Box> = []

  @Prop({ default: 'grey' }) readonly teamColor!: string
  @Prop({ default: 'Individual' }) readonly competitionType!: string
  @State('matchBoxes') stateMatchBoxes
  @Dicts.State('countries') dictsStateCountries
  // @Dicts.Action('fetchCountries') dictsActionFetchCountries

  @Mutation('setRedTeam') mutationSetRedTeam
  @Mutation('setBlueTeam') mutationSetBlueTeam

  get boxes (): Box[] {
    switch (this.competitionType) {
    case 'Individual': return enums.competitionBoxes.individual
    case 'Pair': return enums.competitionBoxes.pair
    case 'Team': return enums.competitionBoxes.team
    default: return enums.competitionBoxes.individual
    }
  }

  @Watch('boxes', { immediate: true, deep: true })
  onChangeBoxes (val: Box[]) {
    if (val) {
      this.matchBoxes = val.filter(x => x.teamColor === this.teamColor)
    }
  }

  @Watch('matchBoxes', { immediate: true, deep: true })
  onChangeMatchBoxes (val: Box[]): void {
    const team = val.reduce((players: Player[], matchBox: Box) => {
      if (matchBox.player) {
        const _player = { ...matchBox.player, boxId: matchBox.id }
        players.push(_player)
      }
      return players
    }, [])

    this.teamColor === 'red' ? this.mutationSetRedTeam(team) : this.mutationSetBlueTeam(team)
  }

  @AsyncComputed({ default: [] })
  fetchedPlayers (): Player[] {
    let filter: string | undefined = ''
    if (this.search) { filter = `fullName.toUpper().Contains("${this.search}".toUpper())` } else return []
    filter = filter || undefined
    return this.$api.ApiPlayerGet({ filter })
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'fullName', 'playerClassification', 'countryId'))
        return _items
      })
  }

  countryById (id): Country | object {
    if (!this.guidRegex.test(id)) return {}
    const country = this.dictsStateCountries.find(x => x.id === id)
    return country || {}
  }
}
</script>

<style lang="stylus">
.flag-icon
  font-size 22px
  border-radius 50%
.v-card
  .red-team
    border 2px solid var(--v-warning-base)
  .blue-team
    border 2px solid var(--v-info-base)
</style>
