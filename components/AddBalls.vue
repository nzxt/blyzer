<template lang="pug">
v-card(width='360px')
  v-toolbar.px-0.ma-0(dense height='32' card flat)
    v-toolbar-items
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(
            color='secondary'
            dark
            flat
            depressed
            v-on='on'
          ) Ends
          // {{ stage[activeBox].box }}
        v-list(dense)
          v-list-tile(
            v-for='(ball, index) in stage'
            :key='index'
            @click='active = ball.box'
          )
            v-list-tile-title {{ ball.stageId }}
    v-spacer
    v-toolbar-items
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(
            color='secondary'
            dark
            flat
            depressed
            v-on='on'
          ) Balls
          // {{ stage[activeBox].box }}
        v-list(dense)
          v-list-tile(
            v-for='(ball, index) in stage'
            :key='index'
            @click='active = ball.box'
          )
            v-list-tile-title {{ ball.stageId }}

  v-card-text.px-0.py-2
    ScoreBoard(:stage='stage')

  v-card-text.pa-0
    Boxes

  v-card-text.px-0.pb-0(v-if='stage')
    v-tabs(v-model='activeTab', color='grey lighten-4',  fixed-tabs, slider-color='deep-orange')
      v-tab.font-weight-bold(v-for='tab in tabs', :key='tab.value', :href="`#tab-${tab.value}`", ripple)
        // v-icon.mdi-24px(left) {{ tab.icon }}
        v-icon.mdi-24px(left) {{ activeTab === `tab-${tab.value}` ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'}}
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

  v-card-text(v-else)
    | Hey!
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
export default class AddBalls extends Vue {
  enums: object = enums

  ballType: number | null = null
  rating: number | null = null

  stage: IBall[] = []

  activeTab: number = 0
  tabs: Array<any> = [
    { value: 1, text: 'Scored Ball', icon: 'mdi-radiobox-marked' },
    { value: 2, text: 'Dead Ball', icon: 'mdi-radiobox-blank' }
  ]

  created (): void {
    const ball0: IBall = new Ball(0, 'Ball 0', 'asiweui')
    const ball1: IBall = new Ball(1, 'Ball 1', 'asdjkas')
    const ball2: IBall = new Ball(2, 'Ball 2', 'asbdask')
    this.stage.push(ball0, ball1, ball2)
  }

  onCancel () {
    this.$bus.$emit('setMatch')
  }
}
</script>
