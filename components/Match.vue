<template lang="pug">
v-card(flat)
  v-subheader
    v-icon.mdi-36px(color='yellow darken-2') mdi-seal
    span.headline.ml-2 Match
      span.ml-1 (
      span.error--text {{ match.scoreRed }}
      | /
      span.primary--text {{ match.scoreRed }}
      | )
  v-card-text
    div.text-xs-right(v-if='match')
      div(v-if='match.matchType')
        | Type:
        span.mx-1.font-weight-bold {{ match.matchType | enumTextById('matchTypes') }}
      div(v-if='tournament.name')
        | Name
        span.mx-1.font-weight-bold {{ tournament.name }}
      div(v-if='match.competitionEvent')
        | Competition:
        span.mx-1.font-weight-bold.ml-1 {{ match.competitionEvent | enumTextByIdFlatten('competitionEvents') }}
      div.ml-1 Date/Time:
        span.mx-1.font-weight-bold {{ match.dateTimeStamp | dateUTCToFull }}
      div.ml-1(v-if='competitionStage')
        | Stage:
        span.mx-1.font-weight-bold {{ competitionStage.toUpperCase() }}
        span.mx-1(v-if='stageIndex') {{ stageIndex }}
    v-divider(inset)
    pre
      | {{ match }}
      | {{ fetchedPlayers }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AsyncComputed } from '~/utils/decorators'
import { IMatch, ITournament, IPlayer } from '~/types/interfaces' // eslint-disable-line

import GlobalMixins from '~/mixins/global'

import { pick } from '~/utils/helpers'

// import { Match } from '~/types/classes' // eslint-disable-line

import enums from '~/assets/enums'
// import { Tournament } from '~/types/classes'

@Component({
  mixins: [GlobalMixins]
})
export default class MatchPage extends Vue {
  $auth
  $moment

  @Prop({ default: {} })
  match!: IMatch

  created () {
    // const match = new Match(new Date(), this.$auth.user.appUserId)
    // console.log({ match, prop: this.match })
  }

  get competitionStage (): string {
    const { match } = this
    if (match.poolStage) return 'pool'
    else if (match.eliminationStage) return 'elimination'
    return ''
  }

  get matchType (): string {
    const { match } = this
    const type = enums.matchTypes.find(x => x.id === match.matchType)
    return type ? type.text : enums.matchTypes[0].text
  }

  get stageIndex (): string {
    const { match } = this
    const stageIndex = match.poolStage || match.eliminationStage
    const stageIndexes = enums.stageIndexes[this.competitionStage].find(x => x.id === stageIndex)
    return stageIndexes ? stageIndexes.text : 'N/A'
  }

  @AsyncComputed({ default: () => {} })
  tournament (): ITournament {
    const id: string | undefined = this.match.tournamentId
    if (!id || !this.guidRegex.test(id)) return {} as ITournament

    return this.$api.ApiTournamentByIdGet({ id })
      .then(({ data }) => {
        // const _items = items.map(x => pick(x, 'id', 'fullName', 'playerClassification', 'countryId'))
        return data // _items
      })
  }

  @AsyncComputed({ default: [] })
  fetchedPlayers (): IPlayer[] {
    const id: string | undefined = this.match.id
    let filter: string | undefined

    if (!id) return []
    else filter = `matchId="${id}"`

    // filter = filter || undefined

    return this.$api.ApiPlayerGet(filter)
      .then(({ data: { items } }) => {
        const _items = items.map(x => pick(x, 'id', 'name'))
        return _items
      })
  }
}
</script>
