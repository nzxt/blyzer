<template lang="pug">
  v-card(height='100%')
    v-form.fill-height(v-model='valid' @submit.prevent='onFinish')
      v-layout.fill-height.justify-space-between(column)
        v-card-text
          v-select(
            v-model='shotType'
            :items="enums.shotTypes"
            item-text='text'
            item-value='id'
            hide-selected
            hide-details
            open-on-clear
            box
            label="Shot type"
          )

        v-card-title.justify-center(v-if='!stateBalls.length')
          div.headline.grey--text.text--lighten-1
            | Let's throw balls!
        v-card-text(v-else style='max-height:242px;overflow:hidden;')
          v-avatar.mt-1(
            style='margin-right:2px;'
            :size='21'
            color='primary'
            v-for='ball in stateBalls'
            :key='ball.id'
          )
            span.white--text.body-2.font-weight-thin {{ ball.rating }}

        v-spacer
        v-card-text.text-xs-center
          span.title.grey--text.font-weight-thin Rate Shot {{ `#${shotIndex}` }}
          v-rating(
            v-model='shotRating'
            @click.native='onSubmit'
            color='orange'
            large
          )

        v-card-actions
          v-btn.secondary.secondary--text(round block outline @click='onCancel')
            v-icon.mdi-18px(left) mdi-reply
            | {{ $t('forms.previous') }}
          v-btn.warning(round block type='submit' :loading='isLoading' :disabled='!stateBalls.length')
            | {{ $t('forms.finish') }}
            v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IBall } from 'types/interfaces' // eslint-disable-line
import { Ball } from '~/types/classes'

import enums from '~/assets/enums'

import * as trainingStore from '~/store/training'
const TrainingNS = namespace(trainingStore.name)
const { types } = trainingStore

@Component({})
export default class TrainingBalls extends Vue {
  $moment

  enums: any = enums

  valid: Boolean = false
  isLoading: Boolean = false

  shotRating: number = null
  shotIndex: number = 1

  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('balls') stateBalls
  @TrainingNS.State('shotType') stateShotType

  @TrainingNS.Mutation(types.ADD_BALL) mutationAddBall
  @TrainingNS.Mutation(types.SET_SHOT_TYPE) mutationSetShotType
  @TrainingNS.Mutation(types.CLEAR_STATE) mutationClearState

  async onSubmit (): Promise<any> {
    if (this.isLoading) return
    this.isLoading = true
    await this.createBall(this.prepareBall())

    setTimeout(() => {
      this.isLoading = false
      this.shotRating = null
      this.shotIndex++
    }, 680)
  }

  onCancel (): void {
    this.$emit('changeComponent', 'Initial')
  }

  onFinish (): void {
    this.mutationClearState()
  }

  async createBall (item: IBall): Promise<any> {
    await this.$api.ApiBallPost({ item })
      .then(({ data }) => {
        item.id = data
        this.mutationAddBall(item)
        // this.$noty.success('<span class="subheading">Ball successfully created!</span>')
      })
      .catch((err) => {
        console.log(err)
        this.$noty.error('Ball creation failed :(')
      })
  }

  prepareBall (): IBall {
    const playerId = '58d7216a-db42-4bea-86f7-aa1c16f5187e' // Artem Kolinko
    const ball: IBall = new Ball(this.shotIndex, playerId)

    ball.rating = this.shotRating
    ball.shotType = this.shotType
    ball.trainingId = this.stateTraining.id

    return ball
  }

  // get isValid (): Boolean {
  //   return !!this.valid && !!this.shotRating
  // }

  get shotTypeName (): string {
    return this.enums.shotTypes.find(x => x.id === this.stateShotType)
  }

  get shotType (): number | null {
    return this.stateShotType
  }

  set shotType (value: number) {
    this.mutationSetShotType(value)
  }
}
</script>
