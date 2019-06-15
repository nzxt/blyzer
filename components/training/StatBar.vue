<template lang="pug">
  v-card(flat)
    v-card-text.px-1.pt-4.pb-0
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

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class StatBar extends Vue {
  @Prop({ default: [] })
  statistics!: Array<any>

  chartOptions: any = {
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    } }

  get barChartOptions (): any {
    if (!this.statistics) return {}
    const labels = this.statistics.reduce((acc, item) => {
      acc.push(`${item.shotTypeAbbr}(${item.shotDistanceName})`)
      return acc
    }, [])
    return { xaxis: { categories: labels }, ...this.chartOptions }
  }

  get barSeries (): Array<any> {
    if (!this.statistics) return []
    const data = this.statistics.reduce((acc, item) => {
      acc.push(item.avgRating * 20)
      return acc
    }, [])
    return [{ data }]
  }
}
</script>
