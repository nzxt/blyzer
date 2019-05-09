<template lang="pug">
  v-card(flat, color='grey lighten-1' min-width='335px' width='100%')
    v-card-text.pa-1
      v-layout(justify-end)
        // div(d-flex,   text-xs-right, justify-end, v-for='i in 12' :key='i') {{ i }}
        v-flex.ma-0(xs1 layout column)
          v-icon.mdi-24px(
            :color='scores[0].team === "red" ? "white" : "white"'
            :class='!stage.balls.lenght ? "mdi-spin" : ""'
          ) mdi-volleyball
        v-divider.ml-4.mr-0(vertical)
        v-flex.ma-0(xs11 layout)
          // v-flex(xs12 layout justify-space-between)
          v-icon.mdi-24px(
            v-for='i in scores.slice(1)'
            :key='i.value'
            :color='i.team === "red" ? "error" : "primary"'
            :class='stage.index === i.value ? "mdi-spin" : ""'
          ) mdi-volleyball
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IStage } from '../types/interfaces' // eslint-disable-line

@Component({})
export default class ScoreBoard extends Vue {
  @Prop({ default: [] })
  stage!: IStage

  active: number | null = 0

  scores: Array<any> = [
    { value: 0, team: 'red', player: 'Peters' },
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

  mounted () {
    // debugger
  }

  created () {
    // debugger
  }
}
</script>

<style lang="stylus" scoped>
.mdi-28px
  font-size: 28px
</style>
