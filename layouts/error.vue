<template lang="pug">
v-layout(column, text-xs-center, justify-center, align-center)
  v-icon.mdi-96px(color='blue-gray') mdi-alert-outline
  h1.grey--text(v-text='error.statusCode === 404 ? "Page not found" : "An error occurred"')
  v-divider
  v-btn.info(round, nuxt, to='/')
    v-icon.mdi-24px(left) mdi-reply
    | Return
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ErrorPage extends Vue {
  @Prop({ default: {} })
  error!: Object
}
</script>

<style scoped lang="stylus">
.mdi-96px
  font-size: 96px
</style>
