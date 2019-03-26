<template lang="pug">
  v-expansion-panel(popup expand v-model='panel')
    v-expansion-panel-content
      template(v-slot:header)
        div.subheading Additional Info
      template(v-slot:actions)
        v-icon(color='grey lighten-5' v-if='tournamentName') mdi-progress-download
        v-icon(color='deep-orange lighten-5' v-else) mdi-car-brake-alert
      v-card
        v-card-text.pa-1
          v-combobox.my-2(
            dense
            v-model='tournamentName'
            :items='["BISFed 2019 Zagreb", "BISFed 2019 Guangzhou Boccia", "BISFed 2019 Montreal Boccia"]'
            color='backpurple'
            hide-details
            hide-no-data
            hide-selected
            label='Tournament name'
            prepend-icon='mdi-trophy-award'
            autofocus
            clearable
          )
            //- persistent-hint
            //- :hint='tournamentName ? `Type: <span class="font-weight-bold">${tournamentTypes.find(x => x.value === tournamentType).name}</span>` : "Choose or enter tournament name..."'
            //- :rules='requiredField'
          v-combobox.my-2(
            dense
            v-model='stageType'
            :items='stageTypes'
            hide-details
            hide-no-data
            hide-selected
            label='Stage type'
            prepend-icon='mdi-tournament'
            clearable
          )

          v-combobox.my-2(
            dense
            v-model='stageIndex'
            :items='stageIndexes'
            hide-details
            hide-no-data
            hide-selected
            label='Stage index'
            prepend-icon='mdi-podium-gold'
            clearable
          )

</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { vObj } from '~/types/models' // eslint-disable-line

import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'

@Component({
  mixins: [ValidateRules]
})
export default class MatchInfo extends Vue {
  panel: Boolean[] = [true]
  tournamentTypes: Array<vObj> = enums.tournamentTypes
  stageTypes: Array<string> = enums.stageTypes
  // stageIndexes: Array<string> = enums.stageIndexes

  tournamentName: string | null = null
  tournamentType: number | null = null
  stageType: string | null = null
  stageIndex: number | null = null

  get stageIndexes (): Array<vObj> {
    switch (this.stageType) {
    case 'Pool': return enums.stageIndexes.pool
    case 'Elimination': return enums.stageIndexes.elimination
    default: return enums.stageIndexes.pool
    }
  }

  @Watch('stageType')
  onChangeStageType () {
    this.stageIndex = null
  }
}
</script>

<style lang="stylus" scoped>
.v-expansion-panel
  >>> .v-expansion-panel__header
    padding 6px 12px
    color #ffffff
    background-color var(--v-warning-lighten2)
</style>
