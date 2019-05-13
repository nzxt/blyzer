<template lang="pug">
v-card.card(style='border:none;')
  ScoreBoard(:stage='stateStage')

  v-card-text.pa-0
    Boxes(ref='boxes')

  v-card-text.px-0.pt-1.pb-0(v-if='stateStage.balls.length')
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
                v-for='scored in enums.shotTypes'
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
              @click='onClickThrowRating'
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
      label='Distance'
      track-color='grey lighten-3'
    )
      //- prepend-icon='mdi-ruler'

    span.subheading.grey--text Opposite Box
    v-item-group(v-model='throwBox')
      v-item(
        v-for='box in 6'
        :key='box'
        :value='box'
      )
        v-icon.mdi-36px(
          slot-scope="{ active, toggle }"
          @click="toggle"
          :color='active ? "primary" : ""'
        ) {{ `mdi-numeric-${box}-box-outline` }}

  v-card-actions
    v-spacer
    v-btn.secondary.secondary--text(
      round
      block
      outline
      @click='onCancel'
    )
      v-icon.mdi-18px(left) mdi-reply
      | {{ $t('forms.previous') }}
    v-spacer
</template>

<script lang="ts">
import { setTimeout } from 'timers'
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

import { IStage, IBall } from 'types/interfaces' // eslint-disable-line
import { Stage, Ball } from '~/types/classes'

import enums from '~/assets/enums'

@Component({
  components: {
    ScoreBoard: () => import('~/components/StageParts/ScoreBoard.vue'),
    Boxes: () => import('~/components/Boxes.vue')
  }
})
export default class AddStage extends Vue {
  enums: any = enums

  throwDistance: number | null = 0
  throwBox: number = null

  throwType: number = null
  throwRating: number = null

  deadBallType: number = null

  activeTab: number = 1
  tabs: Array<any> = [
    { value: 1, text: 'Scored Ball', icon: 'mdi-radiobox-marked' },
    { value: 2, text: 'Dead Ball', icon: 'mdi-radiobox-blank' }
  ]

  @State('match') stateMatch
  @State('stage') stateStage

  @Mutation('setStage') mutationSetStage
  @Mutation('addMatchStage') mutationAddMatchStage
  @Mutation('addStageBall') mutationAddStageBall

  created (): void {
    const stageIndex: number = this.stateMatch.stages.length + 1
    const stage: IStage = new Stage(stageIndex, this.stateMatch.id)
    this.mutationSetStage(stage)
    this.addStageToCurrentMatch(stage)
  }

  addStageToCurrentMatch (stage: IStage): void {
    const { stages } = this.stateMatch
    const isExist = stages.find(x => x.index === stage.index)
    if (!isExist) this.mutationAddMatchStage(stage)
  }

  onCancel (): void {
    this.$bus.$emit('setMatch')
  }

  onClickThrowRating (): void {
    const rating = this.throwRating
    if (rating) {
      this.resetValues()
    }
  }

  addJackBall (): void {
    const { id: playerId } = this.activeBoxPlayer
    const ball: IBall = new Ball(0, playerId)
    ball.isJack = true
    ball.box = this.throwBox
    ball.distance = this.throwDistance
    this.mutationAddStageBall(ball)
  }

  resetValues (): void {
    setTimeout(() => {
      this.throwDistance = 0
      this.throwBox = null
      this.throwType = null
      this.throwRating = null
      this.deadBallType = null
      this.activeTab = 1
    }, 680)
  }

  get throwDistances (): string[] {
    const labels = this.enums.throwDistances.reduce((acc, item) => {
      acc.push(item.text)
      return acc
    }, [])
    return labels
  }

  get distance () {
    return this.throwDistances[this.throwDistance]
  }

  get activeBoxPlayer () {
    return (this.$refs.boxes as any).activeBox.player
  }

  @Watch('throwBox')
  onThrowBoxChange (value: number) {
    if (value && this.throwDistance) {
      this.addJackBall()
      this.resetValues()
    }
  }

  @Watch('throwType')
  onThrowTypeChange (value: number) {
    if (value && this.throwRating) {
      this.resetValues()
    }
  }

  @Watch('throwRating')
  onThrowRatingChange (value: number) {
    if (value && this.throwType) {
      this.resetValues()
    }
  }

  @Watch('deadBallType')
  onDeadBallTypeChange (value: number) {
    if (value) {
      this.resetValues()
    }
  }
}
</script>
