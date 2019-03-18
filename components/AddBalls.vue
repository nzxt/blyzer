<template lang="pug">
v-card
  v-card-text.px-1
    ScoreBoard
  v-card-text.px-1
    Boxes
  v-card-actions
    v-spacer
    v-btn.secondary(block, flat, @click='onCancel')
      v-icon.mdi-18px(left) mdi-reply
      | {{ $t('forms.previous') }}
    v-spacer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ScoreBoard: () => import('~/components/ScoreBoard.vue'),
    Boxes: () => import('~/components/Boxes.vue')
  }
})
export default class AddValues extends Vue {
  $bus
  onCancel () {
    this.$bus.$emit('setPlayers')
  }
}
</script>
