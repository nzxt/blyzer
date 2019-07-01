<template lang="pug">
  v-card(flat)
    v-layout.fill-height.justify-space-between(column)
      TopPanel
      v-card-title.py-2.justify-space-between
        div.headline.grey--text.text--lighten-1
          | Shots
        div
          ChooseExercise(@exerciseSelected='onExerciseSelected')

      v-card-text.pa-0(v-if='stateBalls.length')
        Statistics(:trainingId='stateTraining.id')

      v-spacer
      v-card-actions
        v-btn.mb-4.secondary(
          fab
          bottom
          left
          absolute
          icon
          small
          @click='onCancel'
        )
          v-icon.mdi-24px mdi-format-list-checkbox
          //- | {{ $t('trainings.all') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as trainingStore from '~/store/training'
const TrainingNS = namespace(trainingStore.name)
const { types } = trainingStore

@Component({
  components: {
    ChooseExercise: () => import('~/components/dialogs/ChooseExercise.vue'),
    TopPanel: () => import('./TopPanel.vue'),
    Statistics: () => import('./Statistics.vue')
  }
})
export default class TrainingResults extends Vue {
  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('balls') stateBalls

  @TrainingNS.Mutation(types.CLEAR_BALLS) mutationClearBalls
  @TrainingNS.Mutation(types.CLEAR_STATE) mutationClearState

  onExerciseSelected (): void {
    this.mutationClearBalls()
    this.$emit('changeComponent', 'Balls')
  }

  onCancel (): void {
    this.$router.push('/trainings')
    this.mutationClearState()
  }
}
</script>
