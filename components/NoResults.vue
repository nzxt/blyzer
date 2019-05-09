<template lang="pug">
v-layout(align-center)
  v-flex(text-xs-center)
    v-btn.ma-5.add-btn(large, fab, color='white')
      v-icon.mdi-48px(color='primary' @click='createNew') mdi-plus
    p.headline.grey--text(v-text='`Please add your first ${eventType}`')
    v-chip
      div.title.grey--text {{ eventType === 'Match' ? "Alt + M" : "Alt + T" }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class NoResults extends Vue {
  @Prop({ default: 'Results' })
  eventType!: string

  createNew () {
    this.$router.push(`/new?type=${this.eventType}`)
  }
}
</script>

<style lang="stylus">
.add-btn:before
  box-shadow 0 0 6px 36px
</style>
