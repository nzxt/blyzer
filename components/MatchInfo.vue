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
          //- :items='[].concat(fetchedTournaments, ["BISFed 2019 Zagreb", "BISFed 2019 Guangzhou Boccia", "BISFed 2019 Montreal Boccia"])'
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
            :prepend-icon='tournamentType.icon || "mdi-trophy-award"'
            autofocus
            clearable
          )
            //- persistent-hint
            //- :hint='tournamentName ? `Type: <span class="font-weight-bold">${tournamentTypes.find(x => x.value === tournamentType).name}</span>` : "Choose or enter tournament name..."'
            //- :rules='requiredField'
          //- v-combobox.my-2(
            //- dense
            //- v-model='tournamentType'
            //- :items='stateTournamentTypes'
            //- item-text='name'
            //- item-value='id'
            //- return-object
            //- hide-details
            //- hide-no-data
            //- hide-selected
            //- label='Tournament type'
            //- prepend-icon='mdi-shape-outline'
            //- clearable
          //- )

          // v-combobox.my-2(
          //   dense
          //   v-model='stageType'
          //   :items='stageTypes'
          //   hide-details
          //   hide-no-data
          //   hide-selected
          //   label='Stage type'
          //   prepend-icon='mdi-tournament'
          //   clearable
          // )
          //   template(v-slot:selection='{ item }')
          //     | {{ item.replace(/\b\w/g, l => l.toUpperCase()) }}
          //   template(v-slot:item='{ item }')
          //     | {{ item.replace(/\b\w/g, l => l.toUpperCase()) }}

          v-item-group.mt-3.text-xs-center(v-model='stageType')
            // div.subheading STAGE
            v-item(:value='stype' v-for='stype in stageTypes' :key='stype')
              v-chip.px-2(
                slot-scope="{ active, toggle }"
                @click="toggle"
                :selected="active"
                dark label flat
                :color='active ? "primary" : "grey lighten-1"'
              )
                span.font-weight-medium {{ stype.toUpperCase() }}

          v-item-group.mt-2.text-xs-center(v-model='stageIndex' v-if='stageIndexes.length')
            // div.subheading INDEX
            v-item(:value='sindex.id' v-for='sindex in stageIndexes' :key='sindex.id')
              v-chip(
                slot-scope="{ active, toggle }"
                @click="toggle"
                :selected="active"
                dark label small flat
                :color='active ? "primary" : "grey lighten-1"'
              )
                span.font-weight-medium {{ sindex.text.toUpperCase() }}
          // v-combobox.my-2(
          //   dense
          //   v-model='stageIndex'
          //   :items='stageIndexes'
          //   v-if='stageIndexes.length'
          //   item-text='text'
          //   item-value='id'
          //   hide-details
          //   hide-no-data
          //   hide-selected
          //   label='Stage index'
          //   prepend-icon='mdi-podium-gold'
          //   clearable
          // )
    //- v-dialog(
    //-   v-model='dialog'
    //-   max-width='290'
    //-   persistent
    //- )
    v-snackbar(
      v-model='snackbar'
      multi-line
      bottom
    ) Choose type to create new Tournament.
      v-btn(
        color="pink"
        flat
        @click="snackbar = false"
      ) Close
      //- template(v-slot:activator="{ on }")
        v-btn(color="primary" dark v-on="on") Open  Dialog
      //- v-card
      //-   v-card-title.headline.white--text(class='yellow darken-2') Create Tournament?
      //-   v-card-text You forgot to select Tournament type.
      //-   v-card-actions
      //-     v-spacer
      //-     v-btn(color="green darken-1" flat @click="dialog = false") Agree
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
  snackbar: Boolean = false
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
      if (!this.guidRegex.test(tournamentTypeId as any)) {
        this.snackbar = true
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
        })
        .catch(err => console.log(err))
    } else if (!this.guidRegex.test(tournamentTypeId)) {
      this.mutationSetTournament(null)
      this.snackbar = true
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
</style>
