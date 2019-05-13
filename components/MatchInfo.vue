<template lang="pug">
  v-expansion-panel(expand v-model='panel')
    v-expansion-panel-content
      template(v-slot:header)
        div.subheading Additional Info
      template(v-slot:actions)
        v-icon(color='grey lighten-3' v-if='tournament') mdi-progress-download
        v-icon(color='deep-orange lighten-3' v-else) mdi-car-brake-alert
      v-card
        v-card-text.pa-1
          v-combobox.my-2(
            dense
            v-model='tournament'
            :items='fetchedTournaments'
            :search-input.sync='searchTournament'
            item-text='name'
            item-value='id'
            color='backpurple'
            hide-details
            hide-no-data
            hide-selected
            return-object
            label='Tournament name'
            :prepend-icon='tournamentType ? tournamentType.icon : "mdi-trophy-award"'
            autofocus
            clearable
          )
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

          v-item-group.mt-3.text-xs-center(v-model='stageType')
            v-item(:value='stype' v-for='stype in stageTypes' :key='stype')
              v-chip.px-2(
                slot-scope="{ active, toggle }"
                @click="toggle"
                :selected="active"
                dark label small flat
                :color='active ? "primary" : "grey lighten-1"'
              )
                span.font-weight-medium {{ stype.toUpperCase() }}

          v-item-group.mt-2.text-xs-center(v-model='stageIndex' v-if='stageIndexes.length')
            v-item(:value='sindex.id' v-for='sindex in stageIndexes' :key='sindex.id')
              v-chip.ml-0.mr-1(
                slot-scope="{ active, toggle }"
                @click="toggle"
                :selected="active"
                dark label small flat
                :color='active ? "primary" : "grey lighten-1"'
              )
                span.font-weight-medium {{ sindex.text.toUpperCase() }}
    v-snackbar(
      v-model='snackbarError'
      multi-line
      bottom
    ) Tournament type isn't set.
      v-btn(
        color="warning"
        flat
        @click="snackbarError = false"
      ) Close
    v-snackbar(
      v-model='snackbarCreated'
      multi-line
      bottom
    ) Tournament successfully created.
      v-btn(
        color="success"
        flat
        @click="snackbarCreated = false"
      ) Close
    v-snackbar(
      v-model='snackbarFailed'
      multi-line
      bottom
    ) Tournament creation failed.
      v-btn(
        color="error"
        flat
        @click="snackbarFailed = false"
      ) Close
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
import { AsyncComputed } from '~/utils/decorators'

import { IObj, ITournament, ITournamentType } from '~/types/interfaces' // eslint-disable-line
import { Tournament } from '~/types/classes'

import GlobalMixin from '~/mixins/global'
import ValidateRules from '~/mixins/validate'
import { pick, isPlainObject, isEmptyObject } from '~/utils/helpers'

import enums from '~/assets/enums'

import * as dicts from '~/store/dicts'
const Dicts = namespace(dicts.name)

@Component({
  mixins: [GlobalMixin, ValidateRules]
})
export default class MatchInfo extends Vue {
  snackbarError: Boolean = false
  snackbarCreated: Boolean = false
  snackbarFailed: Boolean = false
  panel: Boolean[] = [true]
  stageTypes: Array<string> = enums.stageTypes

  stageType: string | null = null
  stageIndex: IObj | null = null

  searchTournament: string = ''

  @State('tournament') stateTournament
  @State('tournamentType') stateTournamentType

  @Dicts.State('tournamentTypes') stateTournamentTypes

  @Mutation('setTournament') mutationSetTournament
  @Mutation('setTournamentType') mutationSetTournamentType

  get stageIndexes (): Array<IObj> {
    switch (this.stageType) {
    case 'pool': return enums.stageIndexes.pool
    case 'elimination': return enums.stageIndexes.elimination
    default: return []
    }
  }

  @Watch('stageType')
  onChangeStageType () {
    this.stageIndex = this.stageIndexes[0]
  }

  /// Tournament
  @Watch('tournament')
  onChangeTournament (value: ITournament) {
    if (isPlainObject(value)) {
      const { tournamentTypeId } = value
      if (tournamentTypeId) {
        const tournamentType = this.stateTournamentTypes.find(x => x.id === tournamentTypeId)
        this.tournamentType = tournamentType || null
      }
    }
  }

  get tournament (): ITournament {
    const { stateTournament } = this
    return isEmptyObject(stateTournament) ? null : stateTournament
  }
  set tournament (value: ITournament) {
    if (isPlainObject(value)) {
      this.mutationSetTournament(value)
    } else if (typeof value === 'string') {
      const tournamentTypeId = this.tournamentType ? this.tournamentType.id : ''
      if (!this.guidRegex.test(tournamentTypeId)) {
        this.snackbarError = true
      } else {
        this.createTournament(value, tournamentTypeId || '')
      }
    } else {
      this.mutationSetTournament(null)
    }
  }

  async createTournament (name: string, tournamentTypeId: string) {
    if (name && this.guidRegex.test(tournamentTypeId)) {
      const item: ITournament = new Tournament(
        name,
        tournamentTypeId
      )
      await this.$api.ApiTournamentPost({ item })
        .then(({ data }) => {
          item.id = data
          this.mutationSetTournament(item)
          this.snackbarCreated = true
        })
        .catch((err) => {
          this.snackbarFailed = true
          console.log(err)
        })
    } else if (!this.guidRegex.test(tournamentTypeId)) {
      this.mutationSetTournament(null)
      this.snackbarError = true
    }
  }

  @AsyncComputed({ default: [] })
  fetchedTournaments (): ITournament[] {
    const { searchTournament } = this
    let filter: string | undefined

    if (!searchTournament) return []
    else filter = `Name.ToUpper().Contains("${searchTournament}".ToUpper())`

    filter = filter || undefined

    return this.$api.ApiTournamentGet(filter)
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'dateFrom', 'dateTo', 'name', 'tournamentTypeId'))
        return _items
      })
  }

  /* Tournament Type */
  @Watch('tournamentType')
  onChangeTournamentType (value: ITournamentType) {
    const { tournament, searchTournament } = this
    if (value && value.id && !tournament && searchTournament) {
      this.createTournament(searchTournament, value.id)
    }
  }

  get tournamentType (): ITournamentType {
    const { stateTournamentType } = this
    return isEmptyObject(stateTournamentType) ? null : stateTournamentType
  }
  set tournamentType (value: ITournamentType) {
    this.mutationSetTournamentType(value)
  }
}
</script>

<style lang="stylus" scoped>
.v-expansion-panel
  >>> .v-expansion-panel__header
    padding: 6px 12px
    color: grey // #ffffff
    background-color: beige
    // background-color var(--v-warning-base)
    min-height: 32px
</style>
