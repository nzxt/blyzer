<template lang="pug">
  v-card(dark :color='teamColor === "red" ? "error" : "primary"' class='lighten-2')
    v-card-title.py-1.title.font-weight-thin.justify-end {{ teamColor === "red" ? "RED team" : "BLUE team" }}
    v-divider
    v-card-text.pa-1
      v-combobox.mb-2(
        dense
        v-for='mb in matchBoxes'
        :key='mb.id'
        v-model='mb.player'
        :items='fetchedPlayers'
        :prepend-icon='`mdi-numeric-${mb.id}-box-outline`'
        :label='`${mb.player ? `Classification: BC${mb.player.playerClassification}` : ""}`'
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
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
import { AsyncComputed } from '~/utils/decorators'
import { Box, Player } from '~/types/models' // eslint-disable-line

import Mixins from '~/mixins/mixins'
import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'
import * as dicts from '~/store/dicts'

const Dicts = namespace(dicts.name)

@Component({
  mixins: [Mixins, ValidateRules]
})
export default class Team extends Vue {
  $api
  search: string = ''
  matchBoxes: Array<Box> = []
  players: Player[] = [
    { id: '1', fullName: 'Artem Kolinko', countryId: 'UA', playerClassification: 1 },
    { id: '2', fullName: 'Sergio Perry', countryId: 'US', playerClassification: 3 },
    { id: '3', fullName: 'Bogdan Trips', countryId: 'GB', playerClassification: 1 },
    { id: '9', fullName: 'Hoky Grow', countryId: 'JP', playerClassification: 4 },
    { id: '7', fullName: 'Player 7', countryId: 'RU', playerClassification: 1 }
  ]

  @Prop({ default: 'red' }) readonly teamColor!: string
  @Prop({ default: 'Individual' }) readonly competitionType!: string
  @Mutation('setMatchBoxes') mutationSetMatchBoxes

  @State('matchBoxes') stateMatchBoxes

  @Dicts.State('countries') dictsStateCountries
  @Dicts.Action('fetchCountries') dictsActionFetchCountries

  get boxes (): Array<Box> {
    switch (this.competitionType) {
    case 'Individual': return enums.competitionBoxes.individual
    case 'Pair': return enums.competitionBoxes.pair
    case 'Team': return enums.competitionBoxes.team
    default: return enums.competitionBoxes.individual
    }
  }

  @Watch('boxes', { immediate: true, deep: true })
  onChangeBoxes (val: Array<Box>) {
    if (val) {
      this.matchBoxes = val.filter(x => x.teamColor === this.teamColor)
    }
  }

  @Watch('matchBoxes', { immediate: true, deep: true })
  onChangeMatchBoxes (val: Array<any>) {
    const matchBoxesTeam = val.reduce((matchBoxes, mb) => {
      !!mb.player && matchBoxes.push(mb.player)
      return matchBoxes
    }, [])

    const payload = this.teamColor === 'red' ? { redTeam: matchBoxesTeam } : { blueTeam: matchBoxesTeam }

    this.mutationSetMatchBoxes(payload)
  }

  @AsyncComputed()
  fetchedPlayers () {
    let filter: string | undefined = ''
    if (this.search) { filter = `fullName.toUpper().Contains("${this.search}".toUpper())` } else return []
    filter = filter || undefined
    return this.$api.ApiPlayerGet({ filter })
      .then(({ data: { items } }) => {
        return items
      })
  }

  countryById (id) {
    if (!this.guidRegex.test(id)) return
    const country = this.dictsStateCountries.find(x => x.id === id)
    return country || {}
  }
}
</script>

<style lang="stylus">
.flag-icon
  font-size 22px
  border-radius 50%
// .v-card
  // .red-team
  //   border 2px solid var(--v-error-base)
  // .blue-team
  //   border 2px solid var(--v-primary-base)
</style>
