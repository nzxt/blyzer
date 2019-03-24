<template lang="pug">
  v-card.mx-1(flat, color='grey lighten-3')
    v-card-text.pa-1
      v-layout(justify-end)
        //- v-flex(xs11, offset-xs1, layout, justify-space-around)
          //- v-chip.ml-2(dark, small, color='grey', v-for='i in 12' :key='i') {{ i }}
          div(d-flex, text-xs-right, justify-end, v-for='i in 12' :key='i') {{ i }}
        v-flex(xs1, layout, column)
        v-flex(xs1, layout, column)
          v-icon.mdi-24px(color='white') {{ scores[0].team === "red" ? "mdi-volleyball" : "mdi-blank" }}
          v-icon.mdi-24px(color='white') {{ scores[0].team === "blue" ? "mdi-volleyball" : "mdi-blank" }}
        v-divider(vertical, class='mx-2')
        v-flex(xs9, layout, wrap)
          v-flex(xs12, layout, justify-space-between)
            v-icon.mdi-24px(:color='i.team === "red" ? "error" : "grey lighten-2"', v-for='i in scores.slice(1)', :key='i.value') mdi-volleyball
          v-flex(xs12, layout, justify-space-between)
            //- v-icon.mdi-36px(color='white') mdi-volleyball
            v-icon.mdi-24px(:color='i.team === "blue" ? "primary" : "grey lighten-2"', v-for='i in scores.slice(1)', :key='i.value') mdi-volleyball
        //- v-flex(xs12, layout, justify-space-between)
          v-icon.mdi-24px(color='grey', v-for='i in 5' :key='i') mdi-volleyball
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ScoreBoard extends Vue {
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
}
</script>
