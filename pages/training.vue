<template lang="pug">
  component#component(
    :is="stateComponent"
    @changeComponent='mutationSetComponent'
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as training from '~/store/training'
const Training = namespace(training.name)
const { types } = training

@Component({
  components: {
    Results: () => import('~/components/training/Results.vue'),
    Balls: () => import('~/components/training/Balls.vue')
  }
})
export default class TrainingPage extends Vue {
  @Training.State('component') stateComponent
  @Training.Mutation(types.SET_COMPONENT) mutationSetComponent
}
</script>

<style lang="stylus">
  #component
    width 100%
    min-width 312px
    max-width 460px
</style>
