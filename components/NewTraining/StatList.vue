<template lang="pug">
  v-card(flat)
    v-card-text.px-1
      v-layout.align-center(v-for='item in statistics' :key='JSON.stringify(item)')
        v-flex(xs2)
          span.body-2 {{ shotTypeAbbr(item.shotType) }}
        v-flex(xs4)
          span.caption {{ shotDistanceName(item.distance) }}
        v-flex(xs3)
          v-progress-linear(:value='Math.round(item.avgRating * 20)')
        v-flex(xs3)
          v-chip(small) {{ item.count }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as trainingStore from '~/store/training'

import enums from '~/assets/enums'
const TrainingNS = namespace(trainingStore.name)

@Component({})
export default class StatList extends Vue {
  $moment

  @Prop({ default: [] })
  statistics!: string

  enums: any = enums

  @TrainingNS.State('training') stateTraining

  get throwDistances (): string[] {
    const labels = this.enums.throwDistances.reduce((acc, item) => {
      acc.push(item.text)
      return acc
    }, [])
    return labels
  }

  shotTypeAbbr (value: number): string {
    if (!Number.isInteger(value)) return
    return this.enums.shotTypes.find(x => x.id === value).abbr
  }

  shotDistanceName (value: number): string {
    if (!Number.isInteger(value)) return
    return this.throwDistances[value]
  }
}
</script>
