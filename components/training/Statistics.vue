<template lang="pug">
  #statistics
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
        v-icon(left) mdi-chart-donut-variant
        | Pie

      v-tab(href="#bar")
        v-icon(left) mdi-chart-gantt
        | Bar

      v-tabs-items(v-model='tab')
        v-tab-item.text-xs-center(value='list')
          StatList(:statistics='statistics')

        v-tab-item.justify-center(value='pie')
          StatPie(:statistics='statistics')

        v-tab-item.justify-center(value='bar')
          StatBar(:statistics='statistics')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import GlobalMixin from '~/mixins/global'
import enums from '~/assets/enums'

@Component({
  components: {
    StatList: () => import('./StatList.vue'),
    StatPie: () => import('./StatPie.vue'),
    StatBar: () => import('./StatBar.vue')
  },
  mixins: [GlobalMixin]
})
export default class TrainingResults extends Vue {
  @Prop({ default: '' })
  trainingId!: string

  enums: any = enums

  tab: string = 'graph'
  statistics: any = null

  mounted (): void {
    this.fetchStatistics()
  }

  fetchStatistics (): Promise<any> {
    const id = this.trainingId
    if (!this.guidRegex.test(id)) return

    return this.$api.ApiTrainingByIdGet({ id })
      .then(({ data }) => {
        data.map((x) => {
          x.shotTypeName = this.getShotTypeName(x.shotType)
          x.shotTypeAbbr = this.getShotTypeAbbr(x.shotType)
          x.shotDistanceName = this.getShotDistanceName(x.distance)
        })
        this.statistics = data
      })
  }

  getShotTypeName (value: number): string {
    if (!Number.isInteger(value)) return
    return this.enums.shotTypes.find(x => x.id === value).text
  }

  getShotTypeAbbr (value: number): string {
    if (!Number.isInteger(value)) return
    return this.enums.shotTypes.find(x => x.id === value).abbr
  }

  getShotDistanceName (value: number): string {
    if (!Number.isInteger(value)) return
    return this.enums.throwDistances.find(x => x.id === value).text
  }
}
</script>

<style lang="stylus" scoped>
  .v-tabs
    >>> .v-tabs__container
      height: 36px !important
</style>
