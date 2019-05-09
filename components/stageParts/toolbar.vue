<template lang="pug">
  v-toolbar.px-0.ma-0(dense height='32' card flat)
    v-toolbar-items
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(
            color='secondary'
            dark
            flat
            depressed
            v-on='on'
          ) Ends
        v-list(dense)
          v-list-tile(
            v-for='(stage, index) in stateMatch.stages'
            :key='index'
          )
            v-list-tile-title {{ index }}
    v-spacer
    v-toolbar-items
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(
            color='secondary'
            dark
            flat
            depressed
            v-on='on'
          ) Balls
        v-list(dense)
          v-list-tile(
            v-for='(ball, index) in stateStage.balls'
            :key='index'
          )
            v-list-tile-title {{ index }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({})
export default class StageToolbar extends Vue {
  @State('match') stateMatch
  @State('stage') stateStage
}
</script>
