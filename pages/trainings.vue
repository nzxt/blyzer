<template lang="pug">
v-layout
  NoResults(eventType='Training')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    NoResults: () => import('~/components/NoResults.vue')
  }
})
export default class MatchesPage extends Vue {}
</script>