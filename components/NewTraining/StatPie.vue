<template lang="pug">
  v-card(flat)
    v-card-text.px-1.py-2
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

import enums from '~/assets/enums'

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class StatPie extends Vue {
  @Prop({ default: [] })
  statistics!: Array<any>

  enums: any = enums

  pieChartOptions: any = {
    labels: [],
    responsive: [{
      breakpoint: 360,
      options: {
        chart: {
          height: 212
        },
        legend: {
          position: 'top'
        }
      }
    }]
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

  get pieSeries (): Array<number> {
    if (!this.statistics) return []
    this.pieChartOptions.labels = []
    const data = this.statistics.reduce((acc, item) => {
      this.pieChartOptions.labels.push(`${item.shotTypeAbbr} ${this.shotDistanceName(item.distance)}`)
      acc.push(item.count)
      return acc
    }, [])
    return data
  }
}
</script>
