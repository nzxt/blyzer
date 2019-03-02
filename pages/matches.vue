<template lang="pug">
v-layout
  NoResults(eventType='Match')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    NoResults: () => import('~/components/NoResults')
  }
})
export default class MatchesPage extends Vue {}
</script>
