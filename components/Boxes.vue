<template lang="pug">
v-card(flat)
  v-card-text.pa-0
    v-item-group(v-model='activeBox', mandatory)
      v-container(pa-1, grid-list-md)
        v-layout(wrap, justify-center)
          v-flex(v-for='box in stateMatchBoxes' :key='box.id' :class='`xs${12/stateMatchBoxes.length}`')
            v-item(:value='box')
              v-card(
                slot-scope='{ active, toggle }',
                :class='active ? "elevation-7" : ""',
                :color='`${box.teamColor} lighten-2`',
                @click='toggle',
                height='85',
                dark
              )
                // v-scroll-y-transition
                  //- span.display-1.text-xs-center(v-if='active') A
                v-icon.mdi-48px(
                  :color='active ? "yellow darken-1": ""'
                ) {{ `mdi-numeric-${box.id}-box-outline` }}
                br
                v-chip(small v-if='active')
                  v-avatar
                    flag(:iso='countryById(activeBox.player.countryId).alpha2', :title='countryById(activeBox.player.countryId).name')
                  div.body-1 {{ activeBox.player.fullName | tryGetInitials }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

import { IBox, ICountry } from '~/types/interfaces' // eslint-disable-line

import GlobalMixins from '~/mixins/global'

import * as dicts from '~/store/dicts'
const Dicts = namespace(dicts.name)

@Component({
  mixins: [GlobalMixins]
})
export default class Boxes extends Vue {
  activeBox: IBox | null = null

  @State('matchBoxes') stateMatchBoxes
  @Dicts.State('countries') dictsStateCountries

  created (): void {
    if (this.stateMatchBoxes.length) {
      this.activeBox = this.stateMatchBoxes[0]
    }
  }

  countryById (id): ICountry | object {
    if (!this.guidRegex.test(id)) return {}
    const country = this.dictsStateCountries.find(x => x.id === id)
    return country || {}
  }
}
</script>
