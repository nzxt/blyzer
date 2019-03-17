<template lang="pug">
v-card
  v-form(v-model='valid', @submit.prevent='onSubmit')
    v-card-title
      CircleLoader(
        :loading='true',
        color='blue',
        :size='24',
        sizeUnit='px'
      )
      v-spacer
      div.title(v-if='trainingName')
        | {{ trainingName }}
        div.subheading
          | {{ $moment(newTrainingDateTime).format('DD.MM.YYYY HH:mm') }}
      div.title.grey--text(v-else)
        | Please create new Training..
      v-spacer
    v-card-text
      v-container(pa-0, grid-list-md)
        v-layout(wrap, row, justify-space-between)
          v-flex(xs12)
            v-combobox(
              dense
              v-model='trainingName'
              :items='["My 1st training", "My 2nd training", "My home training"]'
              color='backpurple'
              hide-no-data
              hide-selected
              label='Training name'
              placeholder='Enter new training name'
              prepend-icon='mdi-triforce'
              clearable
            )
        v-layout(row, justify-space-between)
          v-flex(xs5)
            v-text-field(
              dense
              v-model='trainingDate'
              color='backpurple'
              label='Date'
              prepend-icon='mdi-calendar'
              readonly
            )
          v-flex(xs4)
            v-text-field(
              dense
              v-model='trainingTime'
              color='backpurple'
              label='Time'
              prepend-icon='mdi-av-timer'
              readonly
            )
    v-card-actions
      v-btn.secondary(small, @click='$router.push("/")')
        v-icon.mdi-18px(left) mdi-reply
        | {{ $t('forms.cancel') }}
      v-spacer
      v-btn.primary(small, type='submit', :loading='isLoading', :disabled='!valid')
        | {{ $t('forms.next') }}
        v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

@Component({})
export default class AddTraining extends Vue {
  $moment
  valid: Boolean = false
  isLoading: Boolean = false

  trainingName: string | null = null
  trainingDateTime: Date | null = null

  @State('training') stateTraining
  @Mutation('setTraining') mutationSetTraining

  created () {
    const storedTraining = this.stateTraining
    if (Object.getOwnPropertyNames(storedTraining).length !== 0) {
      const {
        trainingName,
        trainingDateTime
      } = storedTraining

      this.trainingName = trainingName
      this.trainingDateTime = trainingDateTime
    }
  }

  onSubmit (): void {
    this.isLoading = true

    this.mutationSetTraining({
      trainingName: this.trainingName,
      trainingDateTime: this.trainingDateTime
    })

    setTimeout(() => { this.isLoading = false }, 680)
  }

  get newTrainingDateTime (): Date {
    return new Date()
  }

  get trainingDate (): string {
    return this.$moment(this.newTrainingDateTime).format('DD.MM.YYYY')
  }

  get trainingTime (): string {
    return this.$moment(this.newTrainingDateTime).format('HH:mm')
  }
}
</script>
