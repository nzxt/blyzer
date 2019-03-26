<template lang="pug">
  v-layout.wrapper(row, align-center)
    div.hidden-xs-only
      v-tooltip(v-for='locale in $i18n.locales', :key='locale.code', bottom)
        v-btn.ma-0(slot='activator', icon, @click='onLocaleSwitch(locale.code)')
          flag(:iso='locale.flag', :title='locale.iso')
        span {{ locale.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class LocaleSwitcher extends Vue {
  $moment
  $vuetify

  onLocaleSwitch (code) {
    this.$moment.locale(code)
    this.$vuetify.lang.current = code
    this.$router.replace(this.switchLocalePath(code))
  }
}
</script>

<style scoped lang="stylus">
.wrapper
  max-width 110px

.flag-icon
  font-size 22px
  border-radius 50%
</style>
