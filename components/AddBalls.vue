<template lang="pug">
v-card
  v-card-text.px-0
    ScoreBoard
  v-card-text.pa-0
    Boxes
  v-card-text.px-0.pb-0
    v-tabs(v-model='activeTab', color='grey lighten-4',  fixed-tabs, slider-color='deep-orange')
      v-tab.font-weight-bold(v-for='tab in tabs', :key='tab.value', :href="`#tab-${tab.value}`", ripple)
        v-icon.mdi-24px(left) {{ tab.icon }}
        | {{ tab.name }}
      v-tab-item(value="tab-1")
        v-card(flat)
          v-card-text.pb-0
            v-item-group(v-model='ballType')
              v-chip(v-for='scored in enums.scoredBallTypes', :key='scored.value')
                | {{ scored.name }}
            v-divider.my-3
            span.title.grey--text Rate this shot
            v-rating(large, v-model='rating')
      v-tab-item(value="tab-2")
        v-card(flat)
          v-card-text.pb-0
            v-chip(v-for='dead in enums.deadBallTypes', :key='dead.value')
              | {{ dead.name }}
            v-divider.my-3
  v-card-actions
    v-spacer
    v-btn.secondary.secondary--text(round, block, outline, @click='onCancel')
      v-icon.mdi-18px(left) mdi-reply
      | {{ $t('forms.previous') }}
    v-spacer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import enums from '~/assets/enums'

@Component({
  components: {
    ScoreBoard: () => import('~/components/ScoreBoard.vue'),
    Boxes: () => import('~/components/Boxes.vue')
  }
})
export default class AddValues extends Vue {
  $bus
  enums: any = enums
  activeTab: number = 0
  ballType: number | null = null
  rating: number | null = null
  tabs: Array<any> = [
    { value: 1, name: 'Scored Ball', icon: 'mdi-radiobox-marked' },
    { value: 2, name: 'Dead Ball', icon: 'mdi-radiobox-blank' }
  ]

  onCancel () {
    this.$bus.$emit('setPlayers')
  }
}
</script>
