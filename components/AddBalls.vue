<template lang="pug">
v-card(flat)
  v-card-text.pa-0
    ScoreBoard
  v-card-text.pa-0
    Boxes
  v-card-text.px-0.pb-0
    v-tabs(v-model='activeTab', color='grey lighten-4',  fixed-tabs, slider-color='deep-orange')
      v-tab.font-weight-bold(v-for='tab in tabs', :key='tab.value', :href="`#tab-${tab.value}`", ripple)
        v-icon.mdi-24px(left) {{ tab.icon }}
        | {{ tab.text }}
      v-tab-item(value="tab-1")
        v-card(flat)
          v-card-text.pb-0
            v-item-group(v-model='ballType')
              v-chip(small v-for='scored in enums.scoredBallTypes', :key='scored.value')
                | {{ scored.text }}
            v-divider.my-3
            //- span.title.grey--text Rate this shot
            v-rating(large, v-model='rating')
      v-tab-item(value="tab-2")
        v-card(flat)
          v-card-text.pb-0
            v-chip(v-for='dead in enums.deadBallTypes', :key='dead.value')
              | {{ dead.text }}
            v-divider.my-3
  v-card-actions
    v-spacer
    v-btn.secondary.secondary--text(round, block, outline, @click='onCancel')
      v-icon.mdi-18px(left) mdi-reply
      | {{ $t('forms.previous') }}
    v-spacer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { IBall } from 'types/interfaces' // eslint-disable-line
import { Ball } from '~/types/classes'

import enums from '~/assets/enums'

@Component({
  components: {
    ScoreBoard: () => import('~/components/ScoreBoard.vue'),
    Boxes: () => import('~/components/Boxes.vue')
  }
})
export default class AddValues extends Vue {
  $bus

  enums: any = enums
  activeTab: number = 0
  ballType: number | null = null
  rating: number | null = null
  tabs: Array<any> = [
    { value: 1, text: 'Scored Ball', icon: 'mdi-radiobox-marked' },
    { value: 2, text: 'Dead Ball', icon: 'mdi-radiobox-blank' }
  ]

  created (): void {
    const ball: IBall = new Ball(3, '2342938', 'asdjkas')
    console.log(ball)
  }

  onCancel () {
    this.$bus.$emit('setMatch')
  }
}
</script>
