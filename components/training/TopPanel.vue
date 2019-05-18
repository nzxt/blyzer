<template lang="pug">
  v-card(style='min-width:312px')
    v-card-text.pa-1
      v-layout.subheading.text--grey.text--darken-1
        v-flex(xs5)
          .font-weight-bold {{ shotTypeName }}
          | {{ shotDistanceName }}
        v-flex.text-xs-right(xs7)
          | {{ dateTimeStamp }}
          .font-weight-bold {{ fullName }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as trainingStore from '~/store/training'

import enums from '~/assets/enums'
const TrainingNS = namespace(trainingStore.name)

@Component({})
export default class TopPanel extends Vue {
  $moment

  enums: any = enums

  @TrainingNS.State('training') stateTraining
  @TrainingNS.State('player') statePlayer
  @TrainingNS.State('shotType') stateShotType
  @TrainingNS.State('shotDistance') stateShotDistance

  get throwDistances (): string[] {
    const labels = this.enums.throwDistances.reduce((acc, item) => {
      acc.push(item.text)
      return acc
    }, [])
    return labels
  }

  get shotTypeName (): string {
    if (!Number.isInteger(this.stateShotType)) return
    return this.enums.shotTypes.find(x => x.id === this.stateShotType).text
  }

  get shotDistanceName () {
    return this.throwDistances[this.stateShotDistance]
  }

  get dateTimeStamp () {
    if (!this.stateTraining) return
    const { dateTimeStamp } = this.stateTraining
    return this.$moment(dateTimeStamp).format('DD.MM.YYYY HH:mm')
  }

  get fullName () {
    if (!this.statePlayer) return
    return this.statePlayer.fullName
  }

  get shotType () {
    if (!Number.isInteger(this.stateShotType)) return
    return this.stateShotType
  }

  get shotDistance () {
    if (!Number.isInteger(this.stateShotDistance)) return
    return this.stateShotDistance
  }
}
</script>
