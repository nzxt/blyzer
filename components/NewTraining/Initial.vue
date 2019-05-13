<template lang="pug">
  v-card(height='100%')
    v-form.fill-height(v-model='valid' @submit.prevent='onSubmit')
      v-layout.fill-height.justify-space-between(column)
        v-card-title.justify-center
          div.headline.grey--text.text--lighten-1
            | Let's train!
        v-card-text
          v-container(pa-0 grid-list-md)
            v-layout(row justify-space-around)
              v-flex(xs6 sm4 md3 lg3)
                v-menu(
                  ref='datePicker'
                  v-model='datePicker'
                  :close-on-content-click='false'
                  :disabled='!isNewTraining'
                  lazy
                  transition='scale-transition'
                  offset-y
                  full-width
                  max-width='290px'
                  min-width='290px'
                )
                  template(v-slot:activator='{ on }')
                    v-text-field(
                      v-model='dateStamp'
                      label='Date'
                      prepend-icon='mdi-calendar'
                      persistent-hint
                      readonly
                      v-on='on'
                    )
                      //- hint='Format: YYYY-MM-DD'
                      //- @blur='date = dateStamp'
                  v-date-picker(v-model='dateStamp' no-title @input='datePicker = false')

              v-flex(xs5 sm3 md2 lg2)
                v-menu(
                  ref='timePicker'
                  v-model="timePicker"
                  :close-on-content-click="false"
                  :return-value.sync="timeStamp"
                  :disabled='!isNewTraining'
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                )
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="timeStamp"
                      label="Time"
                      prepend-icon="mdi-av-timer"
                      persistent-hint
                      readonly
                      v-on="on"
                    )
                      //- hint='Format: HH:MM'
                  v-time-picker(
                    v-if="timePicker"
                    v-model="timeStamp"
                    format="24hr"
                    full-width
                    @click:minute="$refs.timePicker.save(timeStamp)"
                  )

        v-card-text.pa-0.text-xs-center
          span.subheading.grey--text Shot type
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
            | {{ $t('forms.cancel') }}
          v-btn.warning(round block type='submit' :loading='isLoading' :disabled='!isValid')
            | {{ $t('forms.start') }}
            v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { ITraining } from 'types/interfaces' //eslint-disable-line
import { Training } from '~/types/classes'

import enums from '~/assets/enums'

import * as trainingStore from '~/store/training'
const TrainingNS = namespace(trainingStore.name)
const { types } = trainingStore

@Component({})
export default class TrainingInitial extends Vue {
  $moment

  enums: any = enums

  valid: Boolean = false
  isLoading: Boolean = false

  datePicker: Boolean = false
  timePicker: Boolean = false

  dateStamp: Date = null
  timeStamp: Date = null

  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('shotType') stateShotType

  @TrainingNS.Mutation(types.SET_TRAINING) mutationSetTraining
  @TrainingNS.Mutation(types.SET_SHOT_TYPE) mutationSetShotType
  @TrainingNS.Mutation(types.CLEAR_STATE) mutationClearState

  mounted (): void {
    if (this.isNewTraining) {
      this.dateStamp = this.$moment().format('YYYY-MM-DD')
      this.timeStamp = this.$moment().format('HH:mm')
    } else {
      const { dateTimeStamp } = this.stateTraining
      this.dateStamp = this.$moment(dateTimeStamp).format('YYYY-MM-DD')
      this.timeStamp = this.$moment(dateTimeStamp).format('HH:mm')
    }
  }

  onSubmit (): void {
    if (this.isNewTraining) { this.createNewTraining() }
    this.$emit('changeComponent', 'Balls')
  }

  onCancel (): void {
    this.mutationClearState()
    this.$router.push('/')
  }

  async createNewTraining (): Promise<any> {
    this.isLoading = true

    const item: ITraining = new Training(
      this.dateTimeStamp,
      this.$auth.user.appUserId
    )

    await this.$api.ApiTrainingPost({ item })
      .then(({ data }) => {
        item.id = data
        this.mutationSetTraining(item)
        this.$noty.success('<span class="subheading">Training successfully created!</span>')
      })
      .catch((err) => {
        console.log(err)
        this.$noty.error('Training creation failed :(')
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  get isValid (): Boolean {
    return !!this.valid && !!this.shotType
  }

  get isNewTraining (): Boolean {
    return !this.stateTraining || !this.stateTraining.id
  }

  get dateTimeStamp (): Date {
    return this.$moment(`${this.dateStamp} ${this.timeStamp}`).format()
  }

  get shotType (): number | null {
    return this.stateShotType
  }

  set shotType (value: number) {
    this.mutationSetShotType(value)
  }
}
</script>
