<template lang="pug">
v-card
  v-form(v-model='valid', @submit.prevent='onSubmit')
    v-card-title
      div.title.teal--text
        | Let's create new Training..
      v-spacer
    v-card-text
      v-container(pa-0, grid-list-md)
        v-layout(row, justify-space-around)
          v-flex(xs5)
            v-menu(
              ref='datePicker'
              v-model='datePicker'
              :close-on-content-click='false'
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
                  hint='Format: YYYY-MM-DD'
                  persistent-hint
                  readonly
                  v-on='on'
                )
                  //- @blur='date = dateStamp'
              v-date-picker(v-model='dateStamp', no-title, @input='datePicker = false')

          v-flex(xs4)
            v-menu(
              ref='timePicker'
              v-model="timePicker"
              :close-on-content-click="false"
              :return-value.sync="timeStamp"
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
                  hint='Format: HH:MM'
                  persistent-hint
                  readonly
                  v-on="on"
                )
              v-time-picker(
                v-if="timePicker"
                v-model="timeStamp"
                format="24hr"
                full-width
                @click:minute="$refs.timePicker.save(timeStamp)"
              )
    v-card-actions
      v-btn.secondary.secondary--text(round, block, outline, @click='$router.push("/")')
        v-icon.mdi-18px(left) mdi-reply
        | {{ $t('forms.cancel') }}
      v-spacer
      v-btn.warning(round, block, :dark='valid' :outline='!valid', type='submit', :loading='isLoading', :disabled='!valid')
        | {{ $t('forms.start') }}
        v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

import { ITraining } from 'types/interfaces' //eslint-disable-line
import { Training } from '~/types/classes'

@Component({})
export default class AddTraining extends Vue {
  $api
  $auth
  $moment

  valid: Boolean = false
  isLoading: Boolean = false

  datePicker: Boolean = false
  timePicker: Boolean = false

  dateStamp: Date = this.$moment().format('YYYY-MM-DD')
  timeStamp: Date = this.$moment().format('HH:mm')

  @State('training') stateTraining
  @Mutation('setTraining') mutationSetTraining

  async onSubmit (): Promise<any> {
    this.isLoading = true

    await this.createNewTraining()
    setTimeout(() => { this.isLoading = false }, 680)
  }

  createNewTraining (): Promise<any> {
    const item: ITraining = new Training(
      this.dateTimeStamp,
      this.$auth.user.appUserId
    )
    return this.$api.ApiTrainingPost({ item })
      .then(({ data }) => {
        item.id = data
        this.mutationSetTraining(item)
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.isLoading = false
      })
  }

  get dateTimeStamp (): Date {
    return this.$moment(`${this.dateStamp} ${this.timeStamp}`).format()
  }
}
</script>
