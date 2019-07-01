<template lang="pug">
  v-card(flat)
    v-card-text.px-1.py-4.pb-0
      v-layout.align-center(v-for='item in statistics' :key='JSON.stringify(item)')
        v-flex(xs3)
          span.body-2 {{ item.shotTypeName }}
        v-flex(xs4)
          span.caption {{ item.shotDistanceName }}
        v-flex(xs2)
          v-progress-linear(:value='Math.round(item.avgRating * 20)')
        v-flex(xs3)
          v-chip(small) {{ item.count }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class StatList extends Vue {
  @Prop({ default: [] })
  statistics!: string
}
</script>
