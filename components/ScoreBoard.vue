<template lang="pug">
  v-card(color="grey lighten-2")
    v-card-text.pa-1
      v-layout(wrap, text-xs-right)
        //- v-flex(xs11, offset-xs1, layout, justify-space-around)
          //- v-chip.ml-2(dark, small, color='grey', v-for='i in 12' :key='i') {{ i }}
          div(d-flex, text-xs-right, justify-end, v-for='i in 12' :key='i') {{ i }}
        v-flex(xs1, layout, column)
          v-icon.mdi-24px(color='white', v-if='red') mdi-volleyball
          v-icon.mdi-24px(color='white', v-else) mdi-volleyball
        v-divider(vertical, class='mx-2')
        v-flex(xs10, layout, wrap)
          v-flex(xs12, layout, justify-space-between)
            v-icon.mdi-24px(color='error', v-for='i in 12' :key='i') mdi-volleyball
          v-flex(xs12, layout, justify-space-between)
            //- v-icon.mdi-36px(color='white') mdi-volleyball
            v-icon.mdi-24px(color='primary', v-for='i in 12' :key='i') mdi-volleyball
        //- v-flex(xs12, layout, justify-space-between)
          v-icon.mdi-24px(color='grey', v-for='i in 5' :key='i') mdi-volleyball
</template>
