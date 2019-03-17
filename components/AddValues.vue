<template lang="pug">
  ScorePanel
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ScorePanel: () => import('~/components/ScorePanel.vue')
  }
})
export default class AddValues extends Vue {

}
</script>
