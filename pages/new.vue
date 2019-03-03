<template lang="pug">
  v-layout(xs12, text-xs-center, align-center)
    v-flex.display-2.grey--text
      p(transition='slide-x-transition') Adding new {{ isMatch ? 'Match' : 'Training'}}...
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class NewPage extends Vue {
  get isMatch (): Boolean {
    return this.$route.query.type === 'match'
  }
}
</script>
