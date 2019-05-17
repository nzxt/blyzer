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
    Initial: () => import('~/components/NewTraining/Initial.vue'),
    Results: () => import('~/components/NewTraining/Results.vue'),
    Exercise: () => import('~/components/NewTraining/Exercise.vue'),
    Balls: () => import('~/components/NewTraining/Balls.vue')
  }
})
export default class NewTraining extends Vue {
  @Training.State('component') stateComponent
  @Training.Mutation(types.SET_COMPONENT) mutationSetComponent
}
</script>
