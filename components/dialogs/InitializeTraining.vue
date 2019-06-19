<template lang="pug">
  v-dialog(
    v-model='dialog'
    width='500'
  )
    template(v-slot:activator="{ on }")
      v-btn(
        dark
        small
        round
        color='backpurple'
        v-on='on'
      )
        v-icon(left) mdi-plus-circle-outline
        | Add New

    v-card(height='100%')
      v-form.fill-height(v-model='valid' @submit.prevent='onSubmit')
        v-layout.fill-height.justify-space-between(column)
          v-card-title.justify-center
            div.headline.grey--text.text--lighten-1
              | New Training

          v-card-text
            v-container(pa-0 grid-list-md)
              v-layout(row justify-space-around)
                v-flex(xs6 sm4)
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

                v-flex(xs5 sm3)
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

          v-card-text
            v-combobox(
              label='Choose Athlete'
              prepend-icon='mdi-account-circle-outline'
              v-model='player'
              :items='players'
              :search-input.sync='search'
              :rules='requiredField'
              :disabled='!isNewTraining'
              browser-autocomplete
              hide-selected
              hide-no-data
              no-filter
              clearable
              dense
            )
              template(v-slot:selection='{ item, index }')
                v-chip(small)
                  v-avatar
                    flag(:iso='countryById(item.countryId).alpha2', :title='countryById(item.countryId).name')
                  div {{ item.fullName }}
              template(v-slot:item='{ index, item }')
                v-list-tile-avatar
                  // v-avatar
                  flag(:iso='countryById(item.countryId).alpha2', :title='countryById(item.countryId).name')
                v-list-tile-content
                  div {{ item.fullName }}
                v-list-tile-action
                  v-chip(small dark color='secondary lighten-3')
                    span.body-2 BC{{item.playerClassification+1}}

          v-spacer
          v-card-actions
            v-btn.secondary.secondary--text(round block outline @click='onCancel')
              v-icon.mdi-18px(left) mdi-reply
              | {{ $t('forms.back') }}
            v-btn.warning(round block type='submit' :loading='isLoading' :disabled='!valid')
              | {{ $t('forms.next') }}
              v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IPlayer, ITraining, ICountry } from 'types/interfaces' //eslint-disable-line
import { Training } from '~/types/classes'

import GlobalMixins from '~/mixins/global'
import ValidateRules from '~/mixins/validate'

import enums from '~/assets/enums'

import * as dictsStore from '~/store/dicts'
import * as trainingStore from '~/store/training'

const DictsNS = namespace(dictsStore.name)
const TrainingNS = namespace(trainingStore.name)
const { types } = trainingStore

@Component({
  mixins: [GlobalMixins, ValidateRules]
})
export default class InitializeTraining extends Vue {
  $moment

  dialog: Boolean = false

  enums: any = enums

  player: IPlayer = null
  search: string = null

  valid: Boolean = false
  isLoading: Boolean = false

  datePicker: Boolean = false
  timePicker: Boolean = false

  dateStamp: Date = null
  timeStamp: Date = null

  @DictsNS.State('players') statePlayers
  @DictsNS.State('countries') stateCountries

  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('player') statePlayer

  @TrainingNS.Mutation(types.SET_TRAINING) mutationSetTraining
  @TrainingNS.Mutation(types.SET_PLAYER) mutationSetPlayer
  @TrainingNS.Mutation(types.CLEAR_STATE) mutationClearState

  created () {
    this.$bus.$on('ShowInitializeTrainingDialog', this.show)
  }

  beforeDestroy () {
    this.$bus.$off('ShowInitializeTrainingDialog')
  }

  // mounted (): void {
  //   if (this.isNewTraining) {
  //     this.dateStamp = this.$moment().format('YYYY-MM-DD')
  //     this.timeStamp = this.$moment().format('HH:mm')
  //   } else {
  //     const { dateTimeStamp } = this.stateTraining
  //     this.dateStamp = this.$moment(dateTimeStamp).format('YYYY-MM-DD')
  //     this.timeStamp = this.$moment(dateTimeStamp).format('HH:mm')
  //     this.player = this.statePlayer
  //   }
  // }

  show () {
    this.dialog = true
  }

  @Watch('show')
  onChangeShow (): void {
    if (this.isNewTraining) {
      this.dateStamp = this.$moment().format('YYYY-MM-DD')
      this.timeStamp = this.$moment().format('HH:mm')
    } else {
      const { dateTimeStamp } = this.stateTraining
      this.dateStamp = this.$moment(dateTimeStamp).format('YYYY-MM-DD')
      this.timeStamp = this.$moment(dateTimeStamp).format('HH:mm')
      this.player = this.statePlayer
    }
  }

  onSubmit (): void {
    if (this.isNewTraining) {
      this.createNewTraining()
      this.mutationSetPlayer(this.player)
    }
    // this.$emit('changeComponent', 'Results')
    this.$router.push('/training')
    this.dialog = false
  }

  onCancel (): void {
    this.mutationClearState()
    this.dialog = false
    // this.$router.push('/trainings')
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
        this.$noty.success('<span class="subheading">Training created!</span>')
      })
      .catch((err) => {
        console.log(err)
        this.$noty.error('Training creation failed :(')
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  countryById (id): ICountry | object {
    if (!this.guidRegex.test(id)) return {}
    const country = this.stateCountries.find(x => x.id === id)
    return country || {}
  }

  get players () {
    if (!this.search) return []
    const searchRegex = new RegExp(this.search, 'i')
    return this.statePlayers.filter(x => searchRegex.test(x.fullName))
  }

  get isNewTraining (): Boolean {
    return !this.stateTraining || !this.stateTraining.id
  }

  get dateTimeStamp (): Date {
    return this.$moment(`${this.dateStamp} ${this.timeStamp}`).format()
  }
}
</script>

<style lang="stylus" scoped>
.flag-icon
  font-size 22px
  border-radius 50%
</style>
