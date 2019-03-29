<template lang="pug">
v-card(style='min-width:360px')
  v-form(v-model='valid' @submit.prevent='onSubmit')
    v-card-text.pa-1
      v-btn-toggle(v-model='competition' mandatory)
        v-btn.font-weight-bold(
          flat
          value='Individual'
          :class='competition==="Individual" ? activeCompetitionClass : ""'
        )
          | Individual
          v-icon.mdi-24px.ml-1 mdi-account
        v-btn.font-weight-bold.mx-1(
          flat
          value='Pair'
          :class='competition==="Pair" ? activeCompetitionClass : ""'
        )
          | Pair
          v-icon.mdi-24px.ml-1 mdi-account-supervisor
        v-btn.font-weight-bold(
          flat
          value='Team'
          :class='competition==="Team" ? activeCompetitionClass : ""'
        )
          | Team
          v-icon.mdi-24px.ml-1 mdi-account-group
    v-card-text.pa-1
      v-chip(small label dark flat color='cyan darken-1' v-for='d in divisions' :key='d.value')
        div.font-weight-thin {{ d.text }}
    v-card-text.pa-1
      Team(teamColor='red' :competitionType='competition')
    v-card-text.pa-1
      Team(teamColor='blue' :competitionType='competition')
    v-card-text.pa-1
      MatchInfo
    v-card-actions
      v-btn.secondary.secondary--text(round, block, outline, @click='$router.push("/")')
        v-icon.mdi-18px(left) mdi-reply
        | {{ $t('forms.cancel') }}
      v-btn.warning(round, block, :dark='valid' :outline='!valid', type='submit', :loading='isLoading', :disabled='!valid')
        | {{ $t('forms.start') }}
        v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

import { vObj } from '~/types/interfaces' // eslint-disable-line

import Team from '~/components/Team.vue'
import MatchInfo from '~/components/MatchInfo.vue'

import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'

@Component({
  mixins: [ValidateRules],
  components: {
    Team,
    MatchInfo
  }
})
export default class AddMatch extends Vue {
  $bus

  valid: Boolean = false
  isLoading: Boolean = false

  competition: string = 'Individual'
  division: number = 4

  @State('match') stateMatch
  @Mutation('setMatch') mutationSetMatch

  created () {
    const storedMatch = this.stateMatch
    if (Object.getOwnPropertyNames(storedMatch).length !== 0) {
      const {
        // tournamentName,
        // tournamentType,
        competition,
        division
        // stage,
        // stageIndex
      } = storedMatch

      // this.tournamentName = tournamentName
      // this.tournamentType = tournamentType
      this.competition = competition
      this.division = division
      // this.stage = stage
      // this.stageIndex = stageIndex
    }
  }

  onSubmit (): void {
    this.isLoading = true

    this.mutationSetMatch({
      competition: this.competition,
      division: this.division
    })

    setTimeout(() => {
      this.isLoading = false
      this.$bus.$emit('setValues')
    }, 680)
  }

  @Watch('competition')
  onCompetitionChange (val: string) {
    if (val === 'Team') {
      this.division = enums.divisions.team[0].value
    }
  }

  get divisions (): Array<vObj> {
    switch (this.competition) {
    case 'Individual': return enums.divisions.individual
    case 'Pair': return enums.divisions.pair
    case 'Team': return enums.divisions.team
    default: return []
    }
  }

  get activeCompetitionClass (): string {
    return 'blue-grey lighten-1 white--text'
  }

  get activeDivisionClass (): string {
    return 'light-blue lighten-3 white--text'
  }
}
</script>

<style lang="stylus" scoped>
.v-btn-toggle
  >>> .v-btn:not(:last-child)
    border none
.v-btn-toggle--selected
  box-shadow none
</style>
