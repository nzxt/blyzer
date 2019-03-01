<template lang="pug">
v-app(light)
  //- v-navigation-drawer(v-model='drawer', :mini-variant='mini', :clipped='clipped', fixed, app)
  //-   v-list
  //-     v-list-tile(v-for='(item, i) in items', :key='i', :to='item.to', router, exact)
  //-       v-list-tile-action
  //-         v-icon {{ item.icon }}
  //-       v-list-tile-content
  //-         v-list-tile-title(v-text='item.title')
  v-toolbar(height='70',:clipped-right='clippedRight', fixed, app)
    //- v-btn(icon, @click.stop='mini = !mini')
    //-   v-icon {{ `mdi-chevron-${mini ? 'right' : 'left'}` }}
    //- v-btn(icon, @click.stop='clipped = !clipped')
    //-   v-icon mdi-web
    //- v-btn(icon, @click.stop='inset = !inset')
    //-   v-icon mdi-blur
    v-toolbar-title(class='display-1 hidden-sm-and-down', v-html='title')
    v-icon.mdi-36px.mdi-rotate-45.ml-1(color='grey lighten-2', class='hidden-sm-and-down', @click='$router.push("/")') mdi-xbox
    v-spacer
    v-layout(wrap, justify-end)
      v-flex(xs3, sm2, lg1 class='text-xs-center')
        v-btn(large, icon, flat, :ripple='false', @click.stop='() => {}', class='toolbar--btn-large')
          v-icon.mdi-48px(color='pink') mdi-chart-bar-stacked
      v-flex(xs3, sm2, lg1 class='text-xs-center')
        v-btn(large, icon, flat, :ripple='false', @click.stop='() => {}', class='toolbar--btn-large')
          v-icon.mdi-48px(color='pink') mdi-plus-outline
      v-flex(xs3, sm2, lg1 class='text-xs-center')
        v-btn(large, icon, flat, :ripple='false', @click.stop='() => {}', class='toolbar--btn-large')
          v-icon.mdi-48px(color='pink') mdi-account-circle-outline

    //- v-toolbar-side-icon(@click='drawer = !drawer')
    v-btn(large, icon, @click.stop='rightDrawer = !rightDrawer', class='toolbar--btn-large')
      v-icon.mdi-36px(color='grey') mdi-menu-open
  v-content
    v-container(fluid fill-height)
      nuxt
  v-navigation-drawer(v-model='rightDrawer', right, :clipped='clippedRight', temporary, fixed, app)
    v-list
      v-list-tile
        //- v-list-tile-action(class='justify-start')
        //-   v-icon(@click.native='clippedRight = !clippedRight') mdi-menu-swap-outline
        v-list-tile-title(style='height:28px', class='headline grey--text', v-text='"NAVIGATION"')
        v-list-tile-action.pr-1(class='justify-end')
          v-btn(large, icon, flat, :ripple='false', @click.stop='rightDrawer = !rightDrawer')
            //- v-icon.mdi-36px mdi-close
            v-icon.mdi-36px.mdi-rotate-45(color='grey') mdi-xbox

  v-footer.px-3(:inset='inset', app)
    span.caption boccialyzer © 2019. All right reserver.
</template>

<script>
export default {
  data() {
    return {
      // drawer: false,
      // mini: false,
      // clipped: true,
      clippedRight: true,
      rightDrawer: false,
      inset: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: '<span class="secondary--text">BOCCIA</span><span class="error--text">LYZER</span>',
      btns_group: 2
    }
  }
}
</script>

<style lang="stylus">
.v-btn--icon.v-btn--large.toolbar--btn-large
  width: 58px
  height: 58px
</style>
