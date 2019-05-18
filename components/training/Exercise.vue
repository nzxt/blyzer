<template lang="pug">
  v-card(height='100%')
    v-form.fill-height(v-model='valid' @submit.prevent='onSubmit')
      v-layout.fill-height.justify-space-between(column)
        v-card-title.justify-center
          div.headline.grey--text.text--lighten-1
            | Shots Options

        v-card-text.text-xs-center
          span.title.font-weight-light(
            v-text='shotDistanceName'
          )
          v-slider.mt-0(
            v-model='shotDistance'
            tick='shotDistance'
            step='1'
            :min='0'
            :max='17'
            ticks='always'
            tick-size='2'
            label='Distance'
            track-color='grey lighten-3'
          )

        v-card-text.pa-0.text-xs-center
          span.subheading.grey--text Shot Type
          v-item-group.mt-2(v-model='shotType')
            v-item(
              v-for='scored in enums.shotTypes'
              :key='scored.id'
              :value='scored.id'
            )
              v-chip(
                slot-scope='{ active, toggle }'
                @click='toggle'
                :color='active ? "primary" : ""'
                :dark='active'
              )
                span.subheading {{ scored.text }}
        v-spacer
        v-card-actions
          v-btn.secondary.secondary--text(round block outline @click='onCancel')
            v-icon.mdi-18px(left) mdi-reply
            | {{ $t('forms.back') }}
          v-btn.warning(round block type='submit' :loading='isLoading' :disabled='!valid')
            | {{ $t('forms.start') }}
            v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import GlobalMixins from '~/mixins/global'
import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'

import * as trainingStore from '~/store/training'

const TrainingNS = namespace(trainingStore.name)
const { types } = trainingStore

@Component({
  mixins: [GlobalMixins, ValidateRules]
})
export default class TrainingExercise extends Vue {
  $moment

  enums: any = enums

  valid: Boolean = false
  isLoading: Boolean = false

  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('shotType') stateShotType
  @TrainingNS.State('shotDistance') stateShotDistance

  @TrainingNS.Mutation(types.SET_SHOT_TYPE) mutationSetShotType
  @TrainingNS.Mutation(types.SET_SHOT_DISTANCE) mutationSetShotDistance

  onSubmit (): void {
    this.$emit('changeComponent', 'Balls')
  }

  onCancel (): void {
    this.$emit('changeComponent', 'Results')
  }

  get isValid (): Boolean {
    return !!Number.isInteger(this.shotType) && !!Number.isInteger(this.stateShotDistance)
  }

  get throwDistances (): string[] {
    const labels = this.enums.throwDistances.reduce((acc, item) => {
      acc.push(item.text)
      return acc
    }, [])
    return labels
  }

  get shotDistanceName () {
    if (!Number.isInteger(this.shotDistance)) return
    return this.throwDistances[this.shotDistance]
  }

  get shotDistance (): number | null {
    return this.stateShotDistance
  }

  set shotDistance (value: number) {
    this.mutationSetShotDistance(value)
  }

  get shotType (): number | null {
    return this.stateShotType
  }

  set shotType (value: number) {
    this.mutationSetShotType(value)
  }
}
</script>
