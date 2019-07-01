<template lang="pug">
  v-card(height='56')
    v-card-text.pa-1
      v-layout.subheading.text--grey.text--darken-1
        v-flex(xs7)
          .font-weight-bold {{ fullName }}
          | {{ dateTimeStamp }}
        v-flex.text-xs-right(xs5)
          | {{ shotDistanceName }}
          .font-weight-bold {{ shotTypeName }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as trainingStore from '~/store/training'

import enums from '~/assets/enums'
const TrainingNS = namespace(trainingStore.name)

@Component({})
export default class TopPanel extends Vue {
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
    if (!Number.isInteger(this.stateShotType)) return 'Shot Type'
    return this.enums.shotTypes.find(x => x.id === this.stateShotType).text
  }

  get shotDistanceName () {
    if (!this.stateShotDistance) return 'Shot Distance'
    return `${this.stateShotDistance} m`
    // return this.throwDistances[this.stateShotDistance]
  }

  get dateTimeStamp () {
    if (this.stateTraining) {
      const { dateTimeStamp } = this.stateTraining
      if (dateTimeStamp) {
        return this.$moment(dateTimeStamp).format('DD.MM.YYYY HH:mm')
      }
    }
    return 'Date/Time'
  }

  get fullName () {
    if (!this.statePlayer) return 'Athlete Name'
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
