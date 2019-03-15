<template lang="pug">
v-layout(justify-space-between)
  v-flex(xs6)
    v-card(dark, color='error')
      v-card-title.display-2
        v-spacer
        | RED SIDE
        v-spacer
  v-flex(xs6)
    v-card(dark, color='primary')
      v-card-title.display-2
        v-spacer
        | BLUE SIDE
        v-spacer
</template>
