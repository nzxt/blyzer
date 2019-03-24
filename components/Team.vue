<template lang="pug">
  //- v-card(:class='teamColor === "red" ? "red-team" : "blue-team"')
  v-card(dark :color='teamColor === "red" ? "error" : "primary"' class='lighten-2')
    v-card-text.pa-1
      v-combobox.mb-2(
        dense
        v-for='mb in matchBoxes'
        :key='mb.id'
        v-model='mb.player'
        :items='[{id: 1, player: "Artem Kolinko / UA", class: "BC1"}, {id: 2, player: "Sergio Perry / US", class: "BC3"}, {id: 3, player: "Bogdan Trips / GB", class: "BC1"}, {id: 9, player: "Hoky Grow / JP", class: "BC4"}, {id: 7, player: "Player 7", class: "BC1"}]'
        :prepend-icon='`mdi-numeric-${mb.id}-box-outline`'
        :color='teamColor === "red" ? "error darken-1" : "primary darken-1"'
        :label='`${mb.player ? `Classification: ${mb.player.class}` : ""}`'
        :hint='`Choose player for ${mb.teamColor} box #${mb.id}`'
        item-text='player'
        item-value='id'
        hide-no-data
        :hide-details='mb.player'
        hide-selected
        :persistent-hint='!mb.player'
        :rules='requiredField'
        clearable
      )
      //- :hint='tournamentName ? `Type: <span class="body-2">${tournamentTypes.find(x => x.value === tournamentType).name}</span>` : "Choose or enter tournament name..."'
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'

interface box {
  id: number;
  teamColor?: string;
  player?: string;
}

@Component({
  mixins: [ValidateRules]
})
export default class Team extends Vue {
  matchBoxes: Array<box> = []

  @Prop({ default: 'red' }) readonly teamColor!: string
  @Prop({ default: 'Individual' }) readonly competitionType!: string

  @Watch('boxes', { immediate: true, deep: true })
  onChangeBoxes (val: Array<box>) {
    if (val) {
      this.matchBoxes = val.filter(x => x.teamColor === this.teamColor)
    }
  }

  get boxes (): Array<box> {
    switch (this.competitionType) {
    case 'Individual': return enums.competitionBoxes.individual
    case 'Pair': return enums.competitionBoxes.pair
    case 'Team': return enums.competitionBoxes.team
    default: return enums.competitionBoxes.individual
    }
  }
}
</script>

<style lang="stylus">
// .v-card
  // .red-team
  //   border 2px solid var(--v-error-base)
  // .blue-team
  //   border 2px solid var(--v-primary-base)
</style>
