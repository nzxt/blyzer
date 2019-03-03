<template lang="pug">
    v-layout(justify-center, align-center, wrap)
      v-flex.pt-4(xs10, sm8, md4)
        v-img(contain, height="40vh", src='/images/white-boccia-ball.jpg', alt='Boccia Ball')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class IndexPage extends Vue {}
</script>
