<template lang="pug">
  v-card(style='min-width:312px;')
    v-form.fill-height(@submit.prevent='addNew')
      v-layout.fill-height.justify-space-between(column)
        TopPanel
        v-card-title.py-2.justify-space-between
          div.headline.grey--text.text--lighten-1
            | Shots
          div
            ChooseExercise(@exerciseSelected='$emit("changeComponent", "Balls")')

        v-card-text.pa-0(v-if='stateBalls.length')
          Statistics(:trainingId='stateTraining.id')

        v-spacer
        v-card-actions
          v-btn.secondary.secondary--text(round block outline @click='onCancel')
            v-icon.mdi-18px(left) mdi-reply
            | {{ $t('trainings.all') }}
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

  @TrainingNS.Mutation(types.CLEAR_STATE) mutationClearState

  addNew (): void {
    // this.$emit('changeComponent', 'Exercise')
    this.$bus.$emit('ShowChooseExerciseDialog')
  }

  onCancel (): void {
    this.$router.push('/trainings')
    this.mutationClearState()
  }
}
</script>
