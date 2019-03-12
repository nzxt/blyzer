<template lang="pug">
  v-layout(wrap, text-xs-center, justify-center, align-center)
    v-flex(xs12)
      component(:is='component')
    v-flex.display-2.grey--text
      p(transition='slide-x-transition') Adding new {{ isMatch ? 'Match' : 'Training'}}...
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    AddMatch: () => import('~/components/AddMatch.vue'),
    AddTraining: () => import('~/components/AddTraining.vue')
  }
})
export default class NewPage extends Vue {
  get isMatch (): Boolean {
    return this.$route.query.type === 'match'
  }

  get component (): String {
    return this.isMatch ? 'AddMatch' : 'AddTraining'
  }
}
</script>
