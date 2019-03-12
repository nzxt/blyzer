<template lang="pug">
  v-layout.animation(justify-center, align-center, wrap)
    v-flex.pt-4(xs12, sm8, md4, @click='restart')
      v-img(contain, height="40vh", src='/images/white-boccia-ball.jpg', alt='Boccia Ball')
    v-flex(xs9, sm8, md6)
      div.text
        span.text__first
          span.text__word
            | {{ $t('splash.boccia') }}
          span.text__first-bg
        br
        span.text__second
          span.text__word
            | {{ $t('splash.ukraine') }}
          span.text__second-bg
</template>

<script lang="ts">
import { TimelineLite } from 'gsap/all'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ResultsPage extends Vue {
  tl: any = null

  mounted () {
    this.tl = new TimelineLite({ delay: 1 })

    const firstBg = document.querySelectorAll('.text__first-bg')
    const secBg = document.querySelectorAll('.text__second-bg')
    const word = document.querySelectorAll('.text__word')

    this.tl
      .to(firstBg, 0.2, { scaleX: 1 })
      .to(secBg, 0.2, { scaleX: 1 })
      .to(word, 0.1, { opacity: 1 }, '-=0.1')
      .to(firstBg, 0.2, { scaleX: 0 })
      .to(secBg, 0.2, { scaleX: 0 })
  }

  restart () {
    this.tl.restart()
  }
}
</script>

<style lang="stylus">
.theme--light.application
  background-color #ffffff !important

.animation
  font-family 'Exo 2'
  font-weight 100
  color #a2a2a2

.text
  font-size 12vmin
  line-height 1.205

.text__first, .text__second
  position relative

.text__word
  opacity 0

.text__first-bg, .text__second-bg
  display block
  width 100%
  height 100%
  position absolute
  left 0
  top 0
  z-index 100
  transform-origin left
  transform scaleX(0)

.text__first-bg
  background-color #00B0FF

.text__second-bg
  background-color #FFD600

.text__first
  margin-left 8vmin

.text__second
  margin-left 18vmin
</style>
