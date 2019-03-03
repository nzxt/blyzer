<template lang="pug">
v-app(light)
  v-toolbar.main(:extended="btnGroup === 1", height='70', extension-height="112" :clipped-right='clippedRight', fixed, app)
    v-list(slot='extension', v-if="btnGroup === 1", class='backpurple', dark, @click.native='btnGroup = undefined')
      v-list-tile.px-5(@click.native='$router.push("/new?type=match")')
        v-list-tile-title.title Add New Match!
        v-list-tile-action(class='justify-center')
          v-icon mdi-chevron-right
      v-list-tile.px-5(@click.native='$router.push("/new?type=training")')
        v-list-tile-title.title Add New Training!
        v-list-tile-action(class='justify-center')
          v-icon mdi-chevron-right
    v-toolbar-title(class='headline hidden-md-and-up', v-html='titleSmall')
    v-toolbar-title(class='display-1 hidden-sm-and-down', v-html='title')
    v-icon.mdi-36px.mdi-rotate-45.ml-1(color='grey lighten-2', @click='$router.push("/")') mdi-xbox
    v-spacer
    v-layout(wrap, justify-end)
      v-flex(xs12, class='text-xs-right')
        v-btn-toggle(v-model='btnGroup')
          v-btn(large, icon, flat, nuxt, to='/' :ripple='false', :value='0', class='toolbar--btn-large')
            v-icon.mdi-48px(color='error') mdi-chart-bar-stacked
          v-btn(large, icon, flat, :ripple='false', :value='1', class='toolbar--btn-large')
            v-icon.mdi-48px(color='error') mdi-plus
          v-btn(large, icon, flat, nuxt, to='/reports' :ripple='false', :value='2', class='toolbar--btn-large')
            v-icon.mdi-48px(color='error') mdi-account-circle-outline
    v-btn(large, icon, @click.stop='rightDrawer = !rightDrawer', class='toolbar--btn-large')
      v-icon.mdi-36px(color='secondary') mdi-menu-open

  v-content
    v-container(fluid fill-height, class="white")
      nuxt

  v-navigation-drawer(v-model='rightDrawer', right, :clipped='clippedRight', width='350', class="backpurple", dark, temporary, fixed, app)
    v-list
      v-list-tile.mx-3
        //- v-list-tile-action(class='justify-start')
        //-   v-icon(@click.native='clippedRight = !clippedRight') mdi-menu-swap-outline
        v-list-tile-title
        v-list-tile-action.pr-1(class='justify-end')
          v-btn(large, icon, flat, :ripple='false', @click.stop='rightDrawer = !rightDrawer')
            //- v-icon.mdi-36px mdi-close
            v-icon.mdi-48px.mdi-rotate-45 mdi-xbox
    v-list(two-line)
      v-list-tile(v-for='(item, i) in items', :key='i', :to='item.to', router, exact)
        v-list-tile-action(class='justify-center')
        v-list-tile-content
          v-list-tile-title.title(v-text='item.title')
          v-list-tile-sub-title.caption(v-text='item.descr')
        v-list-tile-action(class='justify-center')
          v-icon {{ item.icon }}

  v-footer.px-3(:inset='inset', app)
    span.caption boccialyzer © 2019. All right reserver.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class DefaultLayout extends Vue {
  // drawer: false,
  // mini: false,
  // clipped: true,
  clippedRight: Boolean = true
  rightDrawer: Boolean = false
  inset: Boolean = false
  items: Array<any> = [
    {
      icon: 'mdi-chevron-right',
      title: 'Dashboard',
      descr: 'All your stats in one place',
      to: '/'
    },
    {
      icon: 'mdi-chevron-right',
      title: 'Matches',
      descr: 'Add or lookup your matches',
      to: '/matches'
    },
    {
      icon: 'mdi-chevron-right',
      title: 'Trainings',
      descr: 'Add or lookup your trainings',
      to: '/trainings'
    },
    {
      icon: 'mdi-chevron-right',
      title: 'Reports',
      descr: 'Reports of your achievements',
      to: '/reports'
    }
  ]
  title: String = '<span class="secondary--text">BOCCIA</span><span class="error--text">LYZER</span>'
  titleSmall: String = '<span class="secondary--text">B</span><span class="error--text">LYZER</span>'
  // titleSmall: String = '<i class="mdi mdi-bing mdi-36px secondary--text"></i><span class="error--text">LYZER</span>'
  btnGroup: Number | undefined = 0
}
</script>

<style lang="stylus">
.v-toolbar.main
  .v-toolbar__content
    padding-right 0
.v-toolbar.main
  .v-btn-toggle .v-btn
    opacity 1
  .v-btn--icon.v-btn--large.toolbar--btn-large
    width 69px
    height 69px
    margin 0
    &:before
      border-radius 0
      opacity 1
      color #0022DD
  .v-btn--active.toolbar--btn-large
    .v-btn__content i
      color #fff !important
</style>
