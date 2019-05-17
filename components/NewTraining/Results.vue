<template lang="pug">
  v-card(style='min-width:312px;')
    v-form.fill-height(@submit.prevent='onSubmit')
      v-layout.fill-height.justify-space-between(column)
        TopPanel
        v-card-title.justify-space-between
          div.headline.grey--text.text--lighten-1
            | Shots
          v-btn.warning(small round type='submit' :loading='isLoading')
            | {{ 'Add New' }}
            v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline

        v-card-text.pa-0(v-if='stateBalls.length')
          v-tabs(
            color='secondary darken-1'
            fixed-tabs
            centered
            dark
          )
            //- slider-color='secondary lighten-4'
            v-tab(href="#list")
              v-icon(left) mdi-format-list-numbered
              | List

            v-tab(href="#pie")
              v-icon(left) mdi-chart-arc
              | Pie

            v-tab(href="#bar")
              v-icon(left) mdi-chart-arc
              | Bar

            v-tabs-items(v-model='tab')
              v-tab-item.text-xs-center(
                value='list'
              )
                StatList(:statistics='statistics')

              v-tab-item.justify-center(
                value='pie'
              )
                StatPie(:statistics='statistics')

              v-tab-item.justify-center(
                value='bar'
              )
                StatBar(:statistics='statistics')

        v-spacer
        v-card-actions
          v-btn.secondary.secondary--text(round block outline @click='onCancel')
            v-icon.mdi-18px(left) mdi-reply
            | {{ $t('trainings.all') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import enums from '~/assets/enums'

import * as trainingStore from '~/store/training'
const TrainingNS = namespace(trainingStore.name)
const { types } = trainingStore

@Component({
  components: {
    TopPanel: () => import('./TopPanel.vue'),
    StatList: () => import('./StatList.vue'),
    StatPie: () => import('./StatPie.vue'),
    StatBar: () => import('./StatBar.vue')
  }
})
export default class TrainingResults extends Vue {
  enums: any = enums

  tab: string = 'graph'
  isLoading: Boolean = false
  statistics: any = null

  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('balls') stateBalls

  @TrainingNS.Mutation(types.CLEAR_STATE) mutationClearState

  mounted (): void {
    this.fetchStatistics()
  }

  onSubmit (): void {
    this.$emit('changeComponent', 'Exercise')
  }

  onCancel (): void {
    this.$router.push('/trainings')
  }

  fetchStatistics (): Promise<any> {
    if (!this.stateTraining) return
    const { id } = this.stateTraining
    return this.$api.ApiStatByIdGet({ id })
      .then(({ data }) => {
        data.map((x) => {
          const shotType = this.enums.shotTypes.find(type => type.id === x.shotType)
          x.shotTypeAbbr = shotType.abbr
          // x.shotTypeName = shotType.text
        })
        this.statistics = data
      })
  }
}
</script>

<style lang="stylus" scoped>
  .v-tabs
    >>> .v-tabs__container
      height: 36px !important
</style>
