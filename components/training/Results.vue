<template lang="pug">
  v-card(style='min-width:312px;')
    v-form.fill-height(@submit.prevent='onSubmit')
      v-layout.fill-height.justify-space-between(column)
        TopPanel
        v-card-title.py-2.justify-space-between
          div.headline.grey--text.text--lighten-1
            | Shots
          v-btn.warning(small round type='submit')
            v-icon.mdi-18px(left) mdi-google-earth
            | {{ 'Add New' }}

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
    TopPanel: () => import('./TopPanel.vue'),
    Statistics: () => import('./Statistics.vue')
  }
})
export default class TrainingResults extends Vue {
  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('balls') stateBalls

  @TrainingNS.Mutation(types.CLEAR_STATE) mutationClearState

  onSubmit (): void {
    this.$emit('changeComponent', 'Exercise')
  }

  onCancel (): void {
    this.$router.push('/trainings')
    this.mutationClearState()
  }
}
</script>
