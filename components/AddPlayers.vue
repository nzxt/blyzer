<template lang="pug">
  v-card
    v-form(v-model='valid', @submit.prevent='onSubmit')
      v-card-title
        CircleLoader(
          :loading='true',
          color='grey',
          :size='36',
          sizeUnit='px'
        )
        v-spacer
        v-flex(layout, column, wrap)
          div.display-1(v-if='competition')
            | {{ competition }}
            span.display-2.primary--text.text--lighten-1
              |   {{ division }}
          div.title(v-if='stage')
            | {{ stage }}
            span.subheading.error--text.text--lighten-1
              |   {{ stageIndex }}
          div.title.grey--text(v-else)
            | Please add Players..
        v-spacer
      v-card-text.pa-1
        v-container(pa-1, grid-list-md)
          v-layout(align-start, justify-center)
            v-flex.ma-0(xs6)
              v-list.error.pb-0(dark, two-line)
                v-subheader RED TEAM
                v-divider
                draggable(v-model='redTeam', group='players', style='min-height: 10px')
                  template(v-for='player in redTeam')
                    v-list-tile.px-0.elevation-2(:key="player.id", avatar)
                      //- v-list-tile-avatar
                        img(v-if='player.avatar', :src="player.avatar")
                        img(v-else-if='$auth.user.picture', :src="$auth.user.picture")
                        flag(v-else, :iso="player.country", style="font-size:36px;border-radius:50%")
                      v-list-tile-content
                        v-list-tile-title(v-html="player.title")
                        v-list-tile-sub-title(v-html="player.subtitle")
                      //- v-list-tile-action
                        v-btn(icon, @click.native='removePlayer(player.id, "red")')
                          v-icon.mdi-24px mdi-delete-forever
                      v-hover
                        template(slot-scope="{ hover }")
                          v-list-tile-action(v-if='!hover')
                            flag(v-if='player.country', :iso="player.country", style="font-size:24px;border-radius:50%")
                            img(v-else, :src="player.avatar")
                          v-list-tile-action(v-else)
                            //- v-btn(icon, @click.native='removePlayer(player.id, "red")')
                            v-icon.mdi-24px(@click.native='removePlayer(player.id, "red")') mdi-account-minus-outline
                  v-btn(block, small, flat, slot="footer", @click.native="addPlayer('red')") Add Player
            v-flex.ma-0(xs6)
              v-list.primary.pb-0(dark, two-line)
                v-subheader BLUE TEAM
                v-divider
                draggable(v-model='blueTeam', group='players', style='min-height: 10px')
                  template(v-for='player in blueTeam')
                    v-list-tile.px-0.elevation-2(:key="player.id" avatar)
                      //- v-list-tile-avatar
                        flag(v-if='player.country', :iso="player.country", style="font-size:36px;border-radius:50%")
                        img(v-else, :src="player.avatar")
                      v-list-tile-content
                        v-list-tile-title(v-html="player.title")
                        v-list-tile-sub-title(v-html="player.subtitle")
                      v-hover
                        template(slot-scope="{ hover }")
                          v-list-tile-action(v-if='!hover')
                            flag(v-if='player.country', :iso="player.country", style="font-size:24px;border-radius:50%")
                            img(v-else, :src="player.avatar")
                          v-list-tile-action(v-else)
                            //- v-btn(icon, @click.native='removePlayer(player.id, "blue")')
                            v-icon.mdi-24px(@click.native='removePlayer(player.id, "blue")') mdi-account-minus-outline
                  v-btn(block, small, flat, slot="footer" @click.native="addPlayer('blue')") Add Player
      v-card-actions
        v-btn.secondary.secondary--text(round, block, outline, @click='onCancel')
          v-icon.mdi-18px(left) mdi-reply
          | {{ $t('forms.previous') }}
        v-spacer
        v-btn.warning.warning--text(round, block, outline, type='submit', :loading='isLoading', :disabled='!valid')
          | {{ $t('forms.next') }}
          v-icon.mdi-18px(right) mdi-arrow-right-drop-circle-outline
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
// import draggable from 'vuedraggable'
// import enums from '~/assets/enums'

const individual: Array<string> = ['BC1', 'BC2', 'BC3', 'BC4']
const pair: Array<string> = ['BC3', 'BC4']
const team: Array<string> = ['BC1/BC2']

const poolIndexes: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N']
const eliminationIndexes: Array<string> = ['1/8 Final', '1/4 Final', '1/2 Final', 'Bronze Final', 'Final']

// interface tournamentType {
//   value: string,
//   text: string
// }

@Component({
  components: {
    draggable: () => import('vuedraggable')
    // Team: () => import('~/components/Team.vue')
  }
})
export default class AddPlayers extends Vue {
  $bus
  $auth
  // tournamentTypes: Array<tournamentType> = enums.tournamentTypes
  competitionTypes: Array<string> = ['Individual', 'Pair', 'Team']
  stageTypes: Array<string> = ['Pool', 'Elimination']

  valid: Boolean = false
  isLoading: Boolean = false

  tournamentName: string | null = null
  // tournamentType: string | null = null
  competition: string | null = null
  division: string | null = null
  stage: string | null = null
  stageIndex: string | null = null

  /** Players */
  redTeam: Array<any> = [
    {
      id: 1,
      avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/1.jpg',
      title: 'Serhiy Gromov',
      country: 'ua',
      subtitle: 'Ukraine'
    },
    {
      id: 2,
      avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/2.jpg',
      title: 'Ketie Parry',
      country: 'ua',
      subtitle: 'Ukraine'
    },
    {
      id: 3,
      avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/3.jpg',
      title: 'Oui Spear',
      country: 'ua',
      subtitle: 'Ukraine'
    }
  ]

  blueTeam: Array<any> = [
    {
      id: 4,
      avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/4.jpg',
      title: 'Peter Summers',
      country: 'gb',
      subtitle: 'Englang'
    },
    {
      id: 5,
      avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/5.jpg',
      title: 'Garry Fish',
      country: 'gb',
      subtitle: 'England'
    }
  ]

  @State('match') stateMatch
  @State('redTeam') stateRedTeam
  @State('blueTeam') stateBlueTeam
  @Mutation('setPlayers') mutationSetPlayers

  created () {
    const storedMatch = this.stateMatch
    if (Object.getOwnPropertyNames(storedMatch).length !== 0) {
      const {
        competition,
        division,
        stage,
        stageIndex
      } = storedMatch

      this.competition = competition
      this.division = division
      this.stage = stage
      this.stageIndex = stageIndex
    }

    if (this.stateRedTeam.length) { this.redTeam = [...this.stateRedTeam] }
    if (this.stateBlueTeam.length) { this.blueTeam = [...this.stateBlueTeam] }
  }

  onSubmit (): void {
    this.isLoading = true

    this.mutationSetPlayers({
      redTeam: [...this.redTeam],
      blueTeam: [...this.blueTeam]
    })

    setTimeout(() => {
      this.isLoading = false
      this.$bus.$emit('setValues')
    }, 680)
  }

  onCancel () {
    this.$bus.$emit('setMatch')
  }

  addPlayer (color) : void {
    const player = {
      id: 0,
      avatar: this.$auth.user.picture,
      title: this.$auth.user.given_name,
      subtitle: 'Ukraine',
      country: 'ua'
    }

    if (this[`${color}Team`].findIndex(x => x.id === player.id) === -1) {
      this[`${color}Team`].push(player)
    }
  }

  removePlayer (id, color): void {
    const index = this[`${color}Team`].findIndex(x => x.id === id)
    this[`${color}Team`].splice(index, 1)
  }

  resetForm () : void {

  }

  get playersMaxCount (): Number {
    switch (this.competition) {
    case 'Individual': return 1
    case 'Pair': return 2
    case 'Team': return 3
    default: return 1
    }
  }

  @Watch('competition')
  onCompetitionChange (val: string) {
    if (val === 'Team') {
      this.division = team[0]
    }
    // this.division = null
  }

  get divisions (): Array<string> {
    switch (this.competition) {
    case 'Individual': return individual
    case 'Pair': return pair
    case 'Team': return team
    default: return []
    }
  }

  // @Watch('stage')
  // onStageChange () {
  //   // this.stageIndex = null
  // }

  get stageIndexes (): Array<string> {
    switch (this.stage) {
    case 'Pool': return poolIndexes
    case 'Elimination': return eliminationIndexes
    default: return []
    }
  }
}
</script>
