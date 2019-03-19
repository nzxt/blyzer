<template lang="pug">
v-card
  v-form(v-model='valid', @submit.prevent='onSubmit')
    v-card-title
      CircleLoader(
        :loading='true',
        color='grey',
        :size='36',
        sizeUnit='px'
        @click='fullfillForm'
      )
      v-divider.mx-3(vertical, inset)
      v-combobox(
        dense
        v-model='tournamentName'
        :items='["BISFed 2019 Zagreb", "BISFed 2019 Guangzhou Boccia", "BISFed 2019 Montreal Boccia"]'
        color='backpurple'
        hide-no-data
        hide-selected
        label='Tournament'
        hint='Choose or enter tournament name...'
        :rules='requiredField'
        persistent-hint
        return-object
        clearable
      )
    v-card-text.py-0(style='font-size:18px;')
      scroll-picker(v-model='tournamentType', :options='tournamentTypes')
    v-card-text.py-0
      v-btn-toggle(v-model='competition', mandatory)
        v-btn.dark(large, value='Individual')
          | Individual
          v-icon.mdi-36px(right) mdi-account
        v-btn.dark(large, value='Pair')
          | Pair
          v-icon.mdi-36px(right) mdi-account-supervisor
        v-btn.dark(large, value='Team')
          | Team
          v-icon.mdi-36px(right) mdi-account-group
      v-flex.mt-3(layout, justify-center)
        v-chip(v-for='division in divisions') {{ division }}
    v-card-text.py-0
      scroll-picker-group(class='flex', style="font-size:18px;")
        scroll-picker(v-model='stage', :options='stageTypes')
        scroll-picker(v-model='stageIndex', :options='stageIndexes')
    v-card-actions
      v-btn.secondary.secondary--text(round, block, outline, @click='$router.push("/")')
        v-icon.mdi-18px(left) mdi-reply
        | {{ $t('forms.cancel') }}
      v-btn.warning.warning--text(round, block, outline, type='submit', :loading='isLoading', :disabled='!valid')
        | {{ $t('forms.next') }}
        v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

import { ScrollPicker, ScrollPickerGroup } from 'vue-scroll-picker'
import 'vue-scroll-picker/dist/style.css'

import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'

const individual: Array<string> = ['BC1', 'BC2', 'BC3', 'BC4']
const pair: Array<string> = ['BC3', 'BC4']
const team: Array<string> = ['BC1/BC2']

const poolIndexes: Array<stageIndex> = [
  { value: 1, name: '1st match' },
  { value: 2, name: '2nd match' },
  { value: 3, name: '3rd match' },
  { value: 4, name: '4th match' },
  { value: 5, name: '5th match' },
  { value: 6, name: '6th match' },
  { value: 7, name: '7th match' },
  { value: 8, name: '8th match' },
  { value: 9, name: '9th match' }
]
const eliminationIndexes: Array<stageIndex> = [
  { value: 1, name: '1/8 Final' },
  { value: 2, name: '1/4 Final' },
  { value: 3, name: '1/2 Final' },
  { value: 4, name: 'Bronze Final' },
  { value: 5, name: 'Final' }
]

interface stageIndex {
  value: number,
  name: string
}

interface tournamentType {
  value: number,
  name: string
}

@Component({
  mixins: [ValidateRules],
  components: {
    ScrollPicker,
    ScrollPickerGroup
  }
})
export default class AddMatch extends Vue {
  $bus
  tournamentTypes: Array<tournamentType> = enums.tournamentTypes
  competitionTypes: Array<string> = ['Individual', 'Pair', 'Team']
  stageTypes: Array<string> = ['Pool', 'Elimination']

  valid: Boolean = false
  isLoading: Boolean = false

  search!: string

  tournamentName!: string
  tournamentType: number = 2
  competition: string = 'Individual'
  division: string = 'BC4'
  stage: string = 'Pool'
  stageIndex: number = 1

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
        stage,
        stageIndex
      } = storedMatch

      this.tournamentName = tournamentName
      this.tournamentType = tournamentType
      this.competition = competition
      this.division = division
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
      stage: this.stage,
      stageIndex: this.stageIndex
    })

    setTimeout(() => {
      this.isLoading = false
      this.$bus.$emit('setPlayers')
    }, 680)
  }

  get tournamentTypeName (): string {
    const typeIndex = this.tournamentType
    const tournamentType = this.tournamentTypes.find(x => x.value === typeIndex) || { value: null, name: '' }
    return tournamentType.name
  }

  @Watch('competition')
  onCompetitionChange (val: string) {
    if (val === 'Team') {
      this.division = team[0]
    }
  }

  get divisions (): Array<string> {
    switch (this.competition) {
    case 'Individual': return individual
    case 'Pair': return pair
    case 'Team': return team
    default: return []
    }
  }

  get stageIndexes (): Array<stageIndex> | Boolean {
    switch (this.stage) {
    case 'Pool': return poolIndexes
    case 'Elimination': return eliminationIndexes
    default: return poolIndexes
    }
  }

  fullfillForm () {
    const match = {
      tournamentName: 'BISFed 2019 Zagreb',
      tournamentType: 0,
      competition: 'Team',
      division: 'BC1/BC2',
      stage: 'Elimination',
      stageIndex: 2
    }
    Object.assign(this, { ...match })
  }
}
</script>
