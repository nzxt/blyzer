<template lang="pug">
v-card(flat)
  v-card-text.pa-0
    v-item-group(v-model='activeBox', mandatory)
      v-container(pa-1, grid-list-md)
        v-layout(wrap)
          v-flex(xs2, v-for='box in boxes', :key='box.id')
            v-item(:value='box.id')
              v-card.d-flex.align-center(
                slot-scope='{ active, toggle }',
                :color='`${box.color} lighten-2`',
                :class='active ? "elevation-7" : ""',
                height='75',
                @click='toggle',
                dark
              )
                v-scroll-y-transition
                  //- span.display-1.text-xs-center(v-if='active') A
                  v-icon.mdi-48px(
                    :color='active ? "blue-grey darken-2": ""'
                  ) {{ `mdi-numeric-${box.id}-box-outline` }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Boxes extends Vue {
  activeBox: Number = 3
  boxes: Array<any> = [
    { id: 1, color: 'error' },
    { id: 2, color: 'primary' },
    { id: 3, color: 'error' },
    { id: 4, color: 'primary' },
    { id: 5, color: 'error' },
    { id: 6, color: 'primary' }
  ]
}
</script>
