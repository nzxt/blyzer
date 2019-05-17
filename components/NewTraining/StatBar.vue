<template lang="pug">
  v-card(flat)
    v-card-text.px-1.py-2
      apexchart(
        type='bar'
        width='100%'
        :options="barChartOptions"
        :series="barSeries"
      )
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts'
import { Component, Prop, Vue } from 'vue-property-decorator'

import enums from '~/assets/enums'

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class StatBar extends Vue {
  @Prop({ default: [] })
  statistics!: Array<any>

  enums: any = enums

  barChartOptions: any = {
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: []
    }
  }

  shotDistanceName (value: number): string {
    if (!Number.isInteger(value)) return
    return this.throwDistances[value]
  }

  get throwDistances (): string[] {
    const labels = this.enums.throwDistances.reduce((acc, item) => {
      acc.push(item.text)
      return acc
    }, [])
    return labels
  }

  get barSeries (): Array<any> {
    if (!this.statistics) return []
    this.barChartOptions.xaxis.categories = []
    const data = this.statistics.reduce((acc, item) => {
      // this.barChartOptions.xaxis.categories.push(`${item.shotTypeAbbr} ${this.shotDistanceName(item.distance)}`)
      this.barChartOptions.xaxis.categories.push(`${item.shotTypeAbbr}-${item.distance}`)
      acc.push(item.avgRating * 20)
      return acc
    }, [])
    return [{ data }]
  }
}
</script>
