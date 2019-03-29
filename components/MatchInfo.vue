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
            v-model='tournament'
            :items='[].concat(fetchedTournaments, ["BISFed 2019 Zagreb", "BISFed 2019 Guangzhou Boccia", "BISFed 2019 Montreal Boccia"])'
            :search-input.sync='searchTournament'
            item-text='name'
            item-value='id'
            color='backpurple'
            hide-details
            hide-no-data
            hide-selected
            return-object
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
            v-model='tournamentType'
            :items='stateTournamentTypes'
            item-text='name'
            item-value='id'
            return-object
            hide-details
            hide-no-data
            hide-selected
            label='Tournament type'
            prepend-icon='mdi-shape-outline'
            clearable
          )

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
import { State, Mutation, namespace } from 'vuex-class'
import { AsyncComputed } from '~/utils/decorators'

import { vObj, ITournament, ITournamentType } from '~/types/interfaces' // eslint-disable-line
import { Tournament } from '~/types/classes'

import GlobalMixin from '~/mixins/global'
import ValidateRules from '~/mixins/validate'
import { isPlainObject, isEmptyObject } from '~/utils/helpers'

import enums from '~/assets/enums'

import * as dicts from '~/store/dicts'
const Dicts = namespace(dicts.name)

@Component({
  mixins: [GlobalMixin, ValidateRules]
})
export default class MatchInfo extends Vue {
  $api

  panel: Boolean[] = [true]
  // tournamentTypes: Array<vObj> = enums.tournamentTypes
  stageTypes: Array<string> = enums.stageTypes
  // stageIndexes: Array<string> = enums.stageIndexes

  tournamentName: string | null = null
  tournamentType: ITournamentType | null = null
  stageType: string | null = null
  stageIndex: number | null = null

  searchTournament: string = ''

  @State('tournament') stateTournament
  @Dicts.State('tournamentTypes') stateTournamentTypes
  @Mutation('setTournament') mutationSetTournament

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

  get tournament (): ITournament {
    const { stateTournament } = this
    return isEmptyObject(stateTournament) ? null : stateTournament
  }
  set tournament (value: ITournament) {
    if (isPlainObject(value)) {
      this.mutationSetTournament(value)
    } else if (typeof value === 'string') {
      let tournamentTypeId: string
      if (this.tournamentType && this.guidRegex.test(this.tournamentType.id)) {
        tournamentTypeId = this.tournamentType.id
        const item: ITournament = new Tournament(
          value,
          tournamentTypeId
        )
        this.$api.ApiTournamentPost({ item })
          .then(({ data }) => {
            item.id = data
            this.mutationSetTournament(item)
          })
          .catch(err => console.log(err))
      }
    }
  }

  @AsyncComputed({ default: [] })
  fetchedTournaments (): ITournament[] {
    const { searchTournament } = this
    let filter: string | undefined

    if (searchTournament) filter = `Name.ToUpper().Contains("${searchTournament}".ToUpper())`

    filter = filter || undefined

    return this.$api.ApiTournamentGet(filter)
      .then(({ data: { items } }) => items)
  }
  // createNewTournament() { }
}
</script>

<style lang="stylus" scoped>
.v-expansion-panel
  >>> .v-expansion-panel__header
    padding 6px 12px
    color #ffffff
    background-color var(--v-warning-lighten2)
</style>
