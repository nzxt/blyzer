<template lang="pug">
v-card
  v-form(v-model='valid', @submit.prevent='onSubmit')
    v-card-title
      CircleLoader(
        :loading='true',
        color='grey',
        :size='36',
        sizeUnit='px'
      )
      v-spacer
      div.title(v-if='tournamentName')
        | {{ tournamentName }}
        div.subheading
          | {{ tournamentTypeName }}
      div.title.grey--text(v-else)
        | Please create new Match..
      v-spacer
    v-card-text
      v-container(pa-0, grid-list-md)
        v-layout(wrap, row, justify-space-between)
          v-flex(xs8)
            v-combobox(
              dense
              v-model='tournamentName'
              :items='["BISFed 2019 Zagreb", "BISFed 2019 Guangzhou Boccia", "BISFed 2019 Montreal Boccia"]'
              :search-input.sync='search'
              color='backpurple'
              hide-no-data
              hide-selected
              item-text='Description'
              item-value='API'
              label='Tournament'
              placeholder='Choose or enter new tournament'
              prepend-icon='mdi-trophy-variant-outline'
              return-object
              clearable
            )
          v-flex(xs4)
            v-select(
              dense
              v-model='tournamentType'
              :items='tournamentTypes'
              color='backpurple'
              hide-no-data
              hide-selected
              clearable
              chips
              item-text='value'
              small-chips
              label='Type'
              placeholder='Select'
              append-icon='mdi-google-physical-web'
            )
              //- template(slot='selection' slot-scope='data')
                v-chip.small
                  | {{ data.item.value }}
              template(slot='item' slot-scope='data')
                | {{ data.item.text }}

        v-layout(row, justify-space-between)
          v-flex(xs8)
            v-select(
              dense
              v-model='competition'
              :items='competitionTypes'
              color='backpurple'
              hide-no-data
              hide-selected
              label='Competition'
              placeholder='Choose competition type'
              prepend-icon='mdi-google-circles-extended'
              return-object
              clearable
            )
          v-flex(xs4)
            v-select(
              dense
              chips
              small-chips
              v-model='division'
              :items='divisions'
              color='backpurple'
              hide-no-data
              hide-selected
              label='Division'
              placeholder='Select'
              append-icon='mdi-camera-control'
              return-object
            )
        v-layout(wrap, row, justify-space-between)
          v-flex(xs7)
            v-select(
              dense
              v-model='stage'
              :items='stageTypes'
              color='backpurple'
              hide-no-data
              hide-selected
              label='Stage'
              placeholder='Choose stage'
              prepend-icon='mdi-source-fork'
              return-object
              clearable
            )
          v-flex(xs5)
            v-select(
              dense
              chips
              small-chips
              v-model='stageIndex'
              :items='stageIndexes'
              color='backpurple'
              hide-no-data
              hide-selected
              label='Index'
              placeholder='Select'
              append-icon='mdi-hexagon-multiple'
              return-object
            )
    v-card-actions
      v-btn.secondary(block, flat, @click='$router.push("/")')
        v-icon.mdi-18px(left) mdi-reply
        | {{ $t('forms.cancel') }}
      v-spacer
      v-btn.success(block, flat, type='submit', :loading='isLoading', :disabled='!valid')
        | {{ $t('forms.next') }}
        v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import enums from '~/assets/enums'

const individual: Array<string> = ['BC1', 'BC2', 'BC3', 'BC4']
const pair: Array<string> = ['BC3', 'BC4']
const team: Array<string> = ['BC1/BC2']

const poolIndexes: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N']
const eliminationIndexes: Array<string> = ['1/8 Final', '1/4 Final', '1/2 Final', 'Bronze Final', 'Final']

interface tournamentType {
  value: string,
  text: string
}

@Component({})
export default class AddMatch extends Vue {
  $bus
  tournamentTypes: Array<tournamentType> = enums.tournamentTypes
  competitionTypes: Array<string> = ['Individual', 'Pair', 'Team']
  stageTypes: Array<string> = ['Pool', 'Elimination']

  valid: Boolean = false
  isLoading: Boolean = false

  tournamentName: string | null = null
  tournamentType: string | null = null
  competition: string | null = null
  division: string | null = null
  search: string | null = null
  stage: string | null = null
  stageIndex: string | null = null

  @State('match') stateMatch
  @Mutation('setMatch') mutationSetMatch

  created () {
    const storedMatch = this.stateMatch
    if (Object.getOwnPropertyNames(storedMatch).length !== 0) {
      const {
        tournamentName,
        tournamentType,
        competition,
        division,
        search,
        stage,
        stageIndex
      } = storedMatch

      this.tournamentName = tournamentName
      this.tournamentType = tournamentType
      this.competition = competition
      this.division = division
      this.search = search
      this.stage = stage
      this.stageIndex = stageIndex
    }
  }

  onSubmit (): void {
    this.isLoading = true

    this.mutationSetMatch({
      tournamentName: this.tournamentName,
      tournamentType: this.tournamentType,
      competition: this.competition,
      division: this.division,
      search: this.search,
      stage: this.stage,
      stageIndex: this.stageIndex
    })

    setTimeout(() => {
      this.isLoading = false
      this.$bus.$emit('setPlayers')
    }, 1680)
  }

  get tournamentTypeName (): string {
    const typeIndex = this.tournamentType
    const tournamentType = this.tournamentTypes.find(x => x.value === typeIndex) || { value: '', text: '' }
    return tournamentType.text
  }

  @Watch('competition')
  onCompetitionChange (val: string) {
    if (val === 'Team') {
      this.division = team[0]
    }
    // this.division = null
  }

  get divisions (): Array<string> {
    switch (this.competition) {
    case 'Individual': return individual
    case 'Pair': return pair
    case 'Team': return team
    default: return []
    }
  }

  @Watch('stage')
  onStageChange () {
    // this.stageIndex = null
  }

  get stageIndexes (): Array<string> {
    switch (this.stage) {
    case 'Pool': return poolIndexes
    case 'Elimination': return eliminationIndexes
    default: return []
    }
  }
}
</script>
