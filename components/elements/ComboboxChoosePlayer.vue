<template lang="pug">
  v-combobox(
    :items='players'
    :value='player'
    @input='$emit("update:player", $event)'
    :search-input.sync='search'
    :label='label'
    prepend-icon='mdi-account-circle-outline'
    hint='Choose an athlete from the list'
    :rules='requiredField'
    persistent-hint
    browser-autocomplete
    hide-selected
    hide-no-data
    clearable
    no-filter
    dense
  )
    //- :disabled='!isNewTraining'
    //- :rules='requiredField'
    template(v-slot:selection='{ item, index }')
      v-chip(small :color='color')
        v-avatar.flag
          flag(:iso='countryById(item.countryId).alpha2', :title='countryById(item.countryId).name')

        div {{ item.fullName }}

    template(v-slot:item='{ index, item }')
      v-list-tile-avatar.flag
        flag(:iso='countryById(item.countryId).alpha2', :title='countryById(item.countryId).name')

      v-list-tile-content
        div {{ item.fullName }}

      v-list-tile-action
        v-chip(small dark color='secondary lighten-3')
          span.body-2 BC{{item.playerClassification+1}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IPlayer, ICountry } from '~/types/interfaces' // eslint-disable-line

import GlobalMixins from '~/mixins/global'
import ValidateRules from '~/mixins/validate'

import * as dictsStore from '~/store/dicts'
const DictsNS = namespace(dictsStore.name)

@Component({
  mixins: [
    GlobalMixins,
    ValidateRules
  ]
})
export default class ComboboxChoosePlayer extends Vue {
  @Prop({ default: () => {} })
  player!: IPlayer

  @Prop({ default: 'Choose Athlete' })
  label!: string

  @Prop({ default: 'light-grey' })
  color!: string

  @DictsNS.State('players') statePlayers
  @DictsNS.State('countries') stateCountries

  search: string = null

  get players (): IPlayer[] {
    if (!this.search) return []
    const searchRegex = new RegExp(this.search, 'i')
    return this.statePlayers.filter(x => searchRegex.test(x.fullName))
  }

  countryById (id): ICountry | object {
    if (!this.guidRegex.test(id)) return {}
    const country = this.stateCountries.find(x => x.id === id)
    return country || {}
  }
}
</script>

<style lang="stylus" scoped>
  .flag
    >>> .flag-icon
      font-size 22px
      border-radius 50%
</style>
