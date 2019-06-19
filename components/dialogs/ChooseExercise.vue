<template lang="pug">
  v-dialog(
    v-model='dialog'
    width='500'
  )
    template(v-slot:activator="{ on }")
      v-btn.warning(
        small
        round
        type='submit'
        v-on='on'
      )
        v-icon(left) mdi-google-earth
        | Add New

    v-card(height='100%')
      v-form.fill-height(v-model='valid' @submit.prevent='onSubmit')
        v-layout.fill-height.justify-space-between(column)
          v-card-title.justify-center
            div.headline.grey--text.text--lighten-1
              | Shots Options

          v-card-text.text-xs-center
            span.title.font-weight-light(
              v-text='`Distance ${shotDistanceName}`'
            )
            v-slider.mt-0(
              v-model='shotDistance'
              tick='shotDistance'
              step='1'
              :min='0'
              :max='17'
              ticks='always'
              tick-size='2'
              track-color='grey lighten-3'
            )
              //- label='Distance'

          v-card-text.pa-0.mb-4.text-xs-center
            span.subheading.grey--text Shot Type
            v-item-group(v-model='shotType')
              v-item(
                v-for='scored in enums.shotTypes'
                :key='scored.id'
                :value='scored.id'
              )
                v-chip(
                  small
                  slot-scope='{ active, toggle }'
                  @click='toggle'
                  :color='active ? "primary" : ""'
                  :dark='active'
                )
                  span.subheading {{ scored.text }}

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

  dialog: Boolean = false

  valid: Boolean = false
  isLoading: Boolean = false

  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('shotType') stateShotType
  @TrainingNS.State('shotDistance') stateShotDistance

  @TrainingNS.Mutation(types.SET_SHOT_TYPE) mutationSetShotType
  @TrainingNS.Mutation(types.SET_SHOT_DISTANCE) mutationSetShotDistance

  created () {
    this.$bus.$on('ShowChooseExerciseDialog', this.show)
  }

  deforeDestroy () {
    this.$bus.$off('ShowChooseExerciseDialog')
  }

  show () {
    this.dialog = true
  }

  onSubmit (): void {
    this.$emit('exerciseSelected')
    this.dialog = false
  }

  onCancel (): void {
    // this.$emit('changeComponent', 'Results')
    this.dialog = false
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
