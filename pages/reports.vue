<template lang="pug">
v-layout(wrap, justify-center, align-center)
  //- v-flex.py-3(xs10)
    div(ref='chartdiv' style='height:250px')
  v-flex.py-3(xs10, sm8, md4)
    v-img(contain, height="40vh", src='/images/white-boccia-ball.jpg', alt='Boccia Ball')
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

// import * as am4core from '@amcharts/amcharts4/core' // Core functionality
// import * as am4charts from '@amcharts/amcharts4/charts' // Charting functionality
// import * as am4charts from '@amcharts/amcharts4/maps' // Maps functionality

// Importing themes
// import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
// import am4themes_dark from "@amcharts/amcharts4/themes/dark"

// import am4langRU from '@amcharts/amcharts4/lang/ru_RU'
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow" // Importing geodata (map data)

// am4core.useTheme(am4themesAnimated) // Importing translations

@Component({
  components: {
    UserProfile: () => import('~/components/UserProfile.vue')
  }
})
export default class IndexPage extends Vue {
  $refs
  // chart?: any

  mounted (): void {
    // const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)

    // chart.language.locale = am4langRU

    // chart.paddingRight = 20

    // const data = []
    // let visits = 10
    // for (let i = 1; i < 366; i++) {
    //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
    //   data.push({
    //     date: new Date(2019, 0, i),
    //     name: 'name' + i,
    //     value: visits
    //   })
    // }

    // chart.data = data

    // const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    // dateAxis.renderer.grid.template.location = 0

    // let valueAxis: any = {}
    // valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    // valueAxis.tooltip.disabled = true
    // valueAxis.renderer.minWidth = 35

    // const series = chart.series.push(new am4charts.LineSeries())
    // series.dataFields.dateX = 'date'
    // series.dataFields.valueY = 'value'

    // series.tooltipText = '{valueY.value}'
    // chart.cursor = new am4charts.XYCursor()

    // const scrollbarX = new am4charts.XYChartScrollbar()
    // scrollbarX.series.push(series)
    // chart.scrollbarX = scrollbarX

    // this.chart = chart
  }

  // beforeDestroy () {
  //   if (this.chart) {
  //     this.chart.dispose()
  //   }
  // }
}
</script>

<style lang="stylus">
  // g[aria-labelledby*='-title']
  //   display: none
</style>
