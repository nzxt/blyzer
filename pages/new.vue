<template lang="pug">
  v-layout(column, text-xs-center, justify-start, align-center)
    v-flex(xs12)
      component(transition='fade-transition', :is='component')
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Mutation, Getter } from 'vuex-class'

@Component({
  components: {
    AddMatch: () => import('~/components/AddMatch.vue'),
    AddTraining: () => import('~/components/AddTraining.vue'),
    AddBalls: () => import('~/components/AddBalls.vue')
  }
})
export default class NewPage extends Vue {
  $bus
  component: string | null = null

  @Mutation('setComponent') mutationSetComponent
  @Getter('getComponent') getterGetComponent

  get isMatch (): Boolean {
    return this.$route.query.type === 'match'
  }

  created () {
    this.component = this.getterGetComponent || this.isMatch ? 'AddMatch' : 'AddTraining'

    this.$bus.$on('setMatch', this.onSetMatch)
    this.$bus.$on('setTraining', this.onSetTraining)
    this.$bus.$on('setBalls', this.onSetBalls)
  }

  beforeDestroy () {
    this.$bus.$off('AddMatch')
    this.$bus.$off('AddTraining')
    this.$bus.$off('setBalls')
  }

  onSetMatch () : void {
    this.component = 'AddMatch'
  }

  onSetTraining () : void {
    this.component = 'AddTraining'
  }

  onSetBalls () : void {
    this.component = 'AddBalls'
  }

  @Watch('isMatch')
  onQueryParamChanged (value: Boolean) {
    this.component = value ? 'AddMatch' : 'AddTraining'
  }

  @Watch('component')
  onComponentChanged (value: string | null) {
    this.mutationSetComponent(value)
  }
}
</script>
