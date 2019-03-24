<template lang="pug">
  v-layout(column, text-xs-center, justify-start, align-center)
    //- v-flex.display-1.grey--text
      p(transition='slide-x-transition') Adding new {{ isMatch ? 'Match' : 'Training'}}...
    v-flex(xs12)
      component(transition='fade-transition', :is='component')
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

@Component({
  components: {
    AddMatch: () => import('~/components/AddMatch.vue'),
    AddTraining: () => import('~/components/AddTraining.vue'),
    AddPlayers: () => import('~/components/AddPlayers.vue'),
    AddBalls: () => import('~/components/AddBalls.vue')
  }
})
export default class NewPage extends Vue {
  $bus
  component: string | null = null

  get isMatch (): Boolean {
    return this.$route.query.type === 'match'
  }

  // get component (): string {
  //   return this.isMatch ? 'AddMatch' : 'AddTraining'
  // }

  created () {
    this.component = this.isMatch ? 'AddMatch' : 'AddTraining'

    this.$bus.$on('setMatch', this.onSetMatch)
    this.$bus.$on('setTraining', this.onSetTraining)
    this.$bus.$on('setPlayers', this.onSetPlayers)
    this.$bus.$on('setValues', this.onSetValues)
  }

  beforeDestroy () {
    this.$bus.$off('AddMatch')
    this.$bus.$off('AddTraining')
    this.$bus.$off('setPlayers')
    this.$bus.$off('setValues')
  }

  onSetMatch () : void {
    this.component = 'AddMatch'
  }

  onSetTraining () : void {
    this.component = 'AddTraining'
  }

  onSetPlayers () : void {
    this.component = 'AddPlayers'
  }

  onSetValues () : void {
    this.component = 'AddBalls'
  }

  @Watch('isMatch')
  onQueryParamChanged (val: Boolean) {
    this.component = val ? 'AddMatch' : 'AddTraining'
  }
}
</script>
