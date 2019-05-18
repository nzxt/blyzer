<template lang="pug">
  component(:is="stateComponent" @changeComponent='mutationSetComponent')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as training from '~/store/training'
const Training = namespace(training.name)
const { types } = training

@Component({
  components: {
    Initial: () => import('~/components/training/Initial.vue'),
    Results: () => import('~/components/training/Results.vue'),
    Exercise: () => import('~/components/training/Exercise.vue'),
    Balls: () => import('~/components/training/Balls.vue')
  }
})
export default class TrainingPage extends Vue {
  @Training.State('component') stateComponent
  @Training.Mutation(types.SET_COMPONENT) mutationSetComponent
}
</script>
