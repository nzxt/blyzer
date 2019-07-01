<template lang="pug">
v-layout(wrap, justify-center)
  v-flex.py-3(xs11, sm8, md5)
    //- v-img(contain, height="40vh", src='/images/white-boccia-ball.jpg', alt='Boccia Ball')
    UserProfile
  //- v-flex(xs12)
    pre
      | {{ $auth.user }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    UserProfile: () => import('~/components/UserProfile.vue')
  }
})
export default class IndexPage extends Vue {}
</script>
