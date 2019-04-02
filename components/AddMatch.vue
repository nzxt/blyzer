<template lang="pug">
v-card(flat style='min-width:320px')
  v-form(v-model='valid' @submit.prevent='onSubmit')
    v-card-text.pa-1
      v-btn-toggle(v-model='competitionType' mandatory)
        v-btn.font-weight-bold(
          flat
          value='individual'
          :class='competitionType==="individual" ? activeCompetitionClass : ""'
        ) Individual
          v-icon.mdi-24px.ml-1 mdi-account
        v-btn.font-weight-bold.mx-1(
          flat
          value='pair'
          :class='competitionType==="pair" ? activeCompetitionClass : ""'
        ) Pair
          v-icon.mdi-24px.ml-1 mdi-account-supervisor
        v-btn.font-weight-bold(
          flat
          value='team'
          :class='competitionType==="team" ? activeCompetitionClass : ""'
        ) Team
          v-icon.mdi-24px.ml-1 mdi-account-group

    v-card-text.pa-1
      v-item-group(v-model='competitionEvent' mandatory)
        v-item(
          v-for='d in competitionEvents'
          :key='d.value'
          :value='d.id'
        )
          v-chip(
            slot-scope="{ active, toggle }"
            @click="toggle"
            :selected="active"
            :color='active ? activeDivisionClass : "blue-grey darken-1"'
            small label dark flat
          )
            div.font-weight-thin {{ d.text }}

    v-card-text.pa-1
      Team(ref='redTeam' teamColor='red' :competitionType='competitionType' :competitionEvent='competitionEvent')
    v-card-text.pa-1
      Team(ref='blueTeam' teamColor='blue' :competitionType='competitionType' :competitionEvent='competitionEvent' )

    v-card-text.pa-1
      MatchInfo(ref='matchInfo')

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
import { State, Mutation, Getter } from 'vuex-class'

import { IObj, IMatch, IMatchToPlayer } from '~/types/interfaces' // eslint-disable-line
import { Match, MatchToPlayer } from '~/types/classes'

import Team from '~/components/Team.vue'
import MatchInfo from '~/components/MatchInfo.vue'

import ValidateRules from '~/mixins/validate'
import { isPlainObject } from '~/utils/helpers'

import enums from '~/assets/enums'

@Component({
  mixins: [ValidateRules],
  components: {
    Team,
    MatchInfo
  }
})
export default class AddMatch extends Vue {
  $api
  $bus
  $auth
  $refs
  $moment

  valid: Boolean = false
  isLoading: Boolean = false

  competitionType: string = 'individual'
  competitionEvent: number = 0

  match: IMatch | null = null

  @State('match') stateMatch
  @Mutation('setMatch') mutationSetMatch
  @Getter('getPlayers') getterGetPlayers

  async onSubmit (): Promise<any> {
    this.isLoading = true
    await this.createMatch(this.prepareMatch())
    setTimeout(() => {
      this.isLoading = false
      this.$bus.$emit('setBalls')
    }, 680)
  }

  prepareMatch (): IMatch {
    const tournament = this.$refs.matchInfo.tournament
    // const tournamentType = this.$refs.matchInfo.tournamentType
    const stageType = this.$refs.matchInfo.stageType
    const stageIndex = this.$refs.matchInfo.stageIndex
    const players = this.getterGetPlayers

    const item: IMatch = new Match(this.$moment().format(), this.$auth.user.appUserId)

    item.matchType = 1
    item.competitionEvent = this.competitionEvent

    if (tournament) item.tournamentId = tournament.id
    if (isPlainObject(stageIndex)) {
      if (stageType === 'pool') item.poolStage = stageIndex.id
      if (stageType === 'elimination') item.eliminationStage = stageIndex.id
    }

    const matchToPlayers: IMatchToPlayer[] = players.map((x) => {
      return new MatchToPlayer(x.boxId, x.id)
    })

    item.matchToPlayers = matchToPlayers
    return item
  }

  async createMatch (item: IMatch): Promise<any> {
    await this.$api.ApiMatchPost({ item })
      .then(({ data }) => {
        item.id = data
        this.mutationSetMatch(item)
      })
      .catch(err => console.log(err))
  }

  @Watch('competitionType')
  onCompetitionChange (value: string) {
    this.competitionEvent = enums.competitionEvents[value][0].id
  }

  get competitionEvents (): Array<IObj> {
    switch (this.competitionType) {
    case 'individual': return enums.competitionEvents.individual
    case 'pair': return enums.competitionEvents.pair
    case 'team': return enums.competitionEvents.team
    default: return enums.competitionEvents.default
    }
  }

  get activeCompetitionClass (): string {
    return 'blue lighten-1 white--text'
  }

  get activeDivisionClass (): string {
    return 'orange white--text'
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
