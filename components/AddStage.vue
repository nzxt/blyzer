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

  v-card-text.px-0.pb-0(v-if='stage.index')
    v-tabs(
      v-model='activeTab'
      color='grey lighten-4'
      fixed-tabs
      slider-color='deep-orange'
    )
      v-tab.font-weight-bold(
        v-for='tab in tabs'
        :key='tab.value'
        :href="`#tab-${tab.value}`"
        ripple
      )
        // v-icon.mdi-24px(left) {{ tab.icon }}
        v-icon.mdi-24px(left) {{ activeTab === `tab-${tab.value}` ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'}}
        | {{ tab.text }}

      v-tab-item(value="tab-1")
        v-card(flat)
          v-card-text.pb-0
            v-item-group(v-model='throwType')
              v-item(
                v-for='scored in enums.scoredBallTypes'
                :key='scored.value'
                :value='scored.value'
              )
                v-chip(
                  slot-scope='{ active, toggle }'
                  @click='toggle'
                  :color='active ? "primary" : ""'
                  :dark='active'
                  small
                ) {{ scored.text }}
            v-divider.my-2
            //- span.title.grey--text Rate this shot
            v-rating(
              v-model='throwRating'
              large
            )

      v-tab-item(value='tab-2')
        v-card(flat)
          v-card-text.pb-0
            v-item-group(v-model='deadBallType')
              v-item(
                v-for='dead in enums.deadBallTypes'
                :key='dead.value'
                :value='dead.value'
              )
                v-chip(
                  slot-scope='{ active, toggle }'
                  @click='toggle'
                  :color='active ? "primary" : ""'
                  :dark='active'
                  small
                ) {{ dead.text }}
            v-divider.my-3

  v-card-text(v-else)
    span.title.font-weight-light(
      v-text='distance'
    )
    v-slider.mt-0(
      v-model='throwDistance'
      tick='throwDistance'
      step='1'
      :min='0'
      :max='17'
      ticks='always'
      tick-size='2'
      prepend-icon='mdi-ruler'
      track-color='grey lighten-3'
    )

    span.title.font-weight-light Opposite box
    v-item-group(v-model='throwBox')
      v-item(
        v-for='box in stateMatchBoxes'
        :key='box.id'
        :value='box.id'
      )
        v-icon(
          slot-scope="{ active, toggle }"
          @click="toggle"
          :color='active ? "primary" : ""'
          x-large
        ) {{ `mdi-numeric-${box.id}-box-outline` }}

  v-card-actions
    v-spacer
    v-btn.secondary.secondary--text(round, block, outline, @click='onCancel')
      v-icon.mdi-18px(left) mdi-reply
      | {{ $t('forms.previous') }}
    v-spacer
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import {
  State
  // Mutation,
  // Getter
} from 'vuex-class'

import { IStage, IBall } from 'types/interfaces' // eslint-disable-line
import { Stage, Ball } from '~/types/classes'

import enums from '~/assets/enums'

@Component({
  components: {
    ScoreBoard: () => import('~/components/ScoreBoard.vue'),
    Boxes: () => import('~/components/Boxes.vue')
  }
})
export default class AddStage extends Vue {
  enums: any = enums

  throwDistance: number = 8
  throwBox: number = null

  throwType: number = null
  throwRating: number = null

  deadBallType: number = null

  stage: IStage = null
  ball: IBall = null

  activeTab: number = 0
  tabs: Array<any> = [
    { value: 1, text: 'Scored Ball', icon: 'mdi-radiobox-marked' },
    { value: 2, text: 'Dead Ball', icon: 'mdi-radiobox-blank' }
  ]

  @State('match') stateMatch
  @State('matchBoxes') stateMatchBoxes

  created (): void {
    const stageIndex = 0
    this.stage = new Stage(stageIndex, this.stateMatch.id)

    const ball0: IBall = new Ball(0, 'Jack Ball', 'baa821a6-f86a-4e1c-a9a7-45338baa7d5a')

    this.stage.balls.push(ball0)
  }

  onCancel () {
    this.$bus.$emit('setMatch')
  }

  nextBall () {

  }

  get throwDistances () {
    const labels = this.enums.throwDistances.reduce((acc, item) => {
      acc.push(item.text)
      return acc
    }, [])
    return labels
  }

  get distance () {
    return this.throwDistances[this.throwDistance]
  }

  @Watch('throwBox')
  onThrowBoxChange (value: number) {
    if (value && this.throwDistance) {
      const stageIndex = this.stage.index + 1
      this.stage = new Stage(stageIndex, this.stateMatch.id)
    }
  }

  @Watch('throwType')
  onThrowTypeChange (value: number) {
    if (value && this.throwRating) {
      const stageIndex = this.stage.index + 1
      this.stage = new Stage(stageIndex, this.stateMatch.id)
    }
  }

  @Watch('throwRating')
  onThrowRatingChange (value: number) {
    if (value && this.throwType) {
      const stageIndex = this.stage.index + 1
      this.stage = new Stage(stageIndex, this.stateMatch.id)
    }
  }

  @Watch('deadBallType')
  onDeadBallTypeChange (value: number) {
    if (value) {
      const stageIndex = this.stage.index + 1
      this.stage = new Stage(stageIndex, this.stateMatch.id)
    }
  }
}
</script>