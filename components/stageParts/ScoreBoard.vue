<template lang="pug">
  v-tabs(
    v-model='active'
    color='grey lighten-3'
    slider-color='warning'
  )
    span.px-2.pt-2.title.grey--text.text--darken-1.font-weight-thin ENDs
    v-tab(
      v-for='n in stateMatch.stages.length'
      :key='n'
      ripple
    )
      span.title {{ n }}

    v-tab-item(
      v-for='n in stateMatch.stages.length'
      :key='n'
    )
      v-card(flat style='border:none;')
        v-card-text.px-1.py-3
          v-layout(justify-center wrap)
            v-avatar.mt-1(
              style='margin-right:2px;'
              :size='22'
              :color='ball.team'
              v-for='ball in stateStage.balls'
              :key='ball.value'
            )
              span.white--text.body-2.font-weight-thin {{ !ball.value ? 'J' : ball.value }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { IStage } from '~/types/interfaces' // eslint-disable-line

@Component({})
export default class ScoreBoard extends Vue {
  @Prop({ default: [] })
  stage!: IStage

  @State('match') stateMatch
  @State('stage') stateStage

  active: number = 1

  scores: Array<any> = [
    { value: 0, team: 'grey', player: 'Peters' },
    { value: 1, team: 'red', player: 'Adams' },
    { value: 2, team: 'red', player: 'Sam' },
    { value: 3, team: 'blue', player: 'Peters' },
    { value: 4, team: 'blue', player: 'Peters' },
    { value: 5, team: 'red', player: 'Adams' },
    { value: 6, team: 'red', player: 'Adams' },
    { value: 7, team: 'red', player: 'Adams' },
    { value: 8, team: 'red', player: 'Adams' },
    { value: 9, team: 'red', player: 'Adams' },
    { value: 10, team: 'blue', player: 'Sam' },
    { value: 11, team: 'blue', player: 'Sam' },
    { value: 12, team: 'blue', player: 'Sam' }
  ]

  mounted (): void {
    // debugger
  }

  created (): void {
    // debugger
  }
}
</script>

<style lang="stylus" scoped>
  .v-tabs
    >>> .v-tabs__container
      height: 36px
</style>
