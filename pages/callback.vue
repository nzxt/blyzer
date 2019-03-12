<template lang="pug">
v-layout(column, text-xs-center, justify-center, align-center)
  v-icon.mdi-96px(color='blue-gray') mdi-security
  h1.grey--text You are Secure!
  v-divider
  v-btn.info(round, nuxt, to='/')
    v-icon.mdi-24px(left) mdi-reply
    | Return
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  middleware: ['auth']
})
export default class CallbackPage extends Vue {}
</script>

<style scoped lang="stylus">
.mdi-96px
  font-size: 96px
</style>
