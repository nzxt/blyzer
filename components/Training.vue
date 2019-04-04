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
      | Type:
      span.mx-1.font-weight-bold {{ match.matchType | enumTextById('matchTypes') }}
      span.mx-1.font-weight-bold.ml-1 {{ match.competitionEvent | enumTextByIdFlatten('competitionEvents') }}
      div.ml-1 Date/Time:
        span.mx-1.font-weight-bold {{ match.dateTimeStamp | dateUTCToFull }}
      div.ml-1 Stage:
        span.mx-1.font-weight-bold {{ competitionStage.toUpperCase() }} {{ stageIndex }}
    v-divider(inset)
    pre {{ match }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IMatch } from 'types/interfaces' // eslint-disable-line
// import { Match } from '~/types/classes' // eslint-disable-line

import enums from '~/assets/enums'

@Component({})
export default class TrainingPage extends Vue {
  $auth
  $moment

  @Prop({ default: {} })
  match!: IMatch

  created () {
    // debugger
    // const match = new Match(new Date(), this.$auth.user.appUserId)
    // console.log({ match, prop: this.match })
  }

  get competitionStage (): string {
    const { match } = this
    if (match.poolStage) return 'pool'
    else if (match.eliminationStage) return 'elimination'
    return 'default'
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
    return stageIndexes ? stageIndexes.text : ''
  }
}
</script>
