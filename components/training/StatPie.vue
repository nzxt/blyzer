<template lang="pug">
  v-card(flat)
    v-card-text.px-1.py-4
      apexchart(
        type='pie'
        width='100%'
        :options="pieChartOptions"
        :series="pieSeries"
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
export default class StatPie extends Vue {
  @Prop({ default: [] })
  statistics!: Array<any>

  chartOptions: any = {
    responsive: [{
      breakpoint: 400,
      options: {
        chart: {
          height: 312
        },
        legend: {
          position: 'top'
        }
      }
    }]
  }

  get pieChartOptions (): any {
    if (!this.statistics) return {}
    const labels = this.statistics.reduce((acc, item) => {
      acc.push(`${item.shotTypeAbbr}(${item.shotDistanceName})`)
      return acc
    }, [])
    return { labels, ...this.chartOptions }
  }

  get pieSeries (): Array<number> {
    if (!this.statistics) return []
    const data = this.statistics.reduce((acc, item) => {
      acc.push(item.count)
      return acc
    }, [])
    return data
  }
}
</script>
