<template lang="pug">
v-card.card
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
      v-item-group(v-model='competitionEvent')
        v-item(
          v-for='d in competitionEvents'
          :key='d.value'
          :value='d.id'
        )
          v-chip(
            slot-scope="{ active, toggle }"
            @click="toggle"
            :selected="active"
            :color='active ? activeDivisionClass : "transparent grey--text"'
            small label flat
            :dark='active'
          )
            div.mx-1.subheading.font-weight-medium {{ d.shortText }}

    v-card-text.pa-1
      Team(
        ref='redTeam'
        teamColor='red'
        :competitionType='competitionType'
        :competitionEvent='competitionEvent'
      )
    v-card-text.pa-1
      Team(
        ref='blueTeam'
        teamColor='blue'
        :competitionType='competitionType'
        :competitionEvent='competitionEvent'
      )

    //- v-card-text.mt-2.pa-1
      MatchInfo(ref='matchInfo')

    v-card-actions
      v-btn.secondary(
        round
        block
        @click='$router.push("/")'
      )
        //- outline
        v-icon.mdi-18px(left) mdi-reply
        | {{ $t('forms.cancel') }}
      v-btn.warning(
        round
        block
        type='submit'
        :loading='isLoading'
        :disabled='!valid'
      )
        //- :dark='valid'
        //- :outline='!valid'
        | {{ $t('forms.start') }}
        v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, Getter } from 'vuex-class'

import { IObj, IMatch, IMatchToPlayer } from '~/types/interfaces' // eslint-disable-line
import { Match, MatchToPlayer } from '~/types/classes'

import Team from '~/components/Team.vue'
import MatchInfo from '~/components/MatchInfo.vue'

import ValidateRules from '~/mixins/validate'
// import { isPlainObject } from '~/utils/helpers'

import enums from '~/assets/enums'

@Component({
  mixins: [ValidateRules],
  components: {
    Team,
    MatchInfo
  }
})
export default class AddMatch extends Vue {
  $refs
  $moment

  valid: Boolean = false
  isLoading: Boolean = false

  competitionType: string = 'individual'
  competitionEvent: number = 0

  @State('match') stateMatch
  @Mutation('setMatch') mutationSetMatch
  @Getter('getMatchToPlayers') getterGetMatchToPlayers

  async onSubmit (): Promise<any> {
    this.isLoading = true
    await this.createMatch(this.prepareMatch())
    setTimeout(() => {
      this.isLoading = false
      this.$bus.$emit('setStage')
    }, 680)
  }

  prepareMatch (): IMatch {
    // const tournament = this.$refs.matchInfo.tournament
    // const tournamentType = this.$refs.matchInfo.tournamentType
    // const stageType = this.$refs.matchInfo.stageType
    // const stageIndex = this.$refs.matchInfo.stageIndex
    const players = this.getterGetMatchToPlayers

    const item: IMatch = new Match(this.$moment().format(), this.$auth.user.appUserId)

    item.matchType = 1
    item.competitionEvent = this.competitionEvent || 0

    // if (tournament) item.tournamentId = tournament.id

    // if (isPlainObject(stageIndex)) {
    //   if (stageType === 'pool') {
    //     item.poolStage = stageIndex.id
    //     item.eliminationStage = 0
    //   } else if (stageType === 'elimination') {
    //     item.poolStage = 0
    //     item.eliminationStage = stageIndex.id
    //   } else {
    //     item.poolStage = 0
    //     item.eliminationStage = 0
    //   }
    // }

    if (players.length) {
      const matchToPlayers: IMatchToPlayer[] = players.map((x) => {
        return new MatchToPlayer(x.boxId, x.id)
      })

      item.matchToPlayers = matchToPlayers
    }

    return item
  }

  async createMatch (item: IMatch): Promise<any> {
    await this.$api.ApiMatchPost({ item })
      .then(({ data }) => {
        item.id = data
        this.mutationSetMatch(item)
        this.$noty.success('<span class="subheading">Match successfully created!</span>')
      })
      .catch((err) => {
        console.log(err)
        this.$noty.error('Match creation failed :(')
      })
  }

  // @Watch('competitionType')
  // onCompetitionChange (value: string) {
  // this.competitionEvent = enums.competitionEvents[value][0].id
  // }

  get competitionEvents (): Array<IObj> {
    switch (this.competitionType) {
    case 'individual': return enums.competitionEvents.individual
    case 'pair': return enums.competitionEvents.pair
    case 'team': return enums.competitionEvents.team
    default: return enums.competitionEvents.individual
    }
  }

  get activeCompetitionClass (): string {
    return 'primary white--text'
  }

  get activeDivisionClass (): string {
    return 'primary white--text'
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
