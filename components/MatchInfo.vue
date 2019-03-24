<template lang="pug">
  v-expansion-panel(popup expand)
    v-expansion-panel-content
      template(v-slot:header)
        div.subheading Additional Info
      template(v-slot:actions)
        v-icon(color='grey lighten-5' v-if='tournamentName') mdi-radiobox-marked
        v-icon(color='deep-orange' v-else) mdi-car-brake-alert
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
            prepend-icon='mdi-trophy-outline'
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
            label='Stage type'
            prepend-icon='mdi-tournament'
            clearable
          )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'

interface vObj {
  value: number;
  name: string;
}

@Component({
  mixins: [ValidateRules]
})
export default class MatchInfo extends Vue {
  tournamentTypes: Array<vObj> = enums.tournamentTypes
  stageTypes: Array<string> = enums.stageTypes

  tournamentName: string | null = null
  tournamentType: number = 2
  stageType: string = 'Pool'
  stageIndex: number = 1

  get stageIndexes (): Array<vObj> {
    switch (this.stageType) {
    case 'Pool': return enums.stageIndexes.pool
    case 'Elimination': return enums.stageIndexes.elimination
    default: return enums.stageIndexes.pool
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-expansion-panel
  >>> .v-expansion-panel__header
    padding 6px 12px
    color #ffffff
    background-color var(--v-warning-lighten3)
</style>
