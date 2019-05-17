<template lang="pug">
  v-container
    NoResults(eventType='Match' v-if='!fetchedMatches.length')
    v-layout.mb-5(v-else-if='!currentMatch')
      v-flex(xs12)
        v-data-iterator(
          :items='fetchedMatches'
          :rows-per-page-items='rowsPerPageItems'
          :pagination.sync='pagination'
          :total-items='pagination.totalItems'
          content-class='match'
          hide-actions
        )
          template(v-slot:header)
            v-toolbar(
              color='secondary lighten-5'
              flat
            )
              v-toolbar-title
                v-badge.my-2.mr-2(overlap color='red')
                  template(v-slot:badge)
                    span {{ pagination.totalItems }}
                  span.pr-3.headline.font-weight-bold Matches
              v-spacer
              // v-toolbar-items
              v-layout.ma-0
                v-flex.hidden-xs-only(style='text-align: -webkit-right;')
                  v-select.rows-per-page(
                    hide-details
                    v-model='pagination.rowsPerPage'
                    :items='rowsPerPageItems'
                    label='Per Page'
                  )
                v-flex.text-xs-right
                  v-btn(dark round color='backpurple' @click='$router.push("/new?type=match")')
                    v-icon(left) mdi-plus
                    | Add New

          template(v-slot:item='props')
            v-flex(xs12 sm6 md4 lg3)
              // v-card(@click='props.expanded = !props.expanded')
              v-card(@click='onMatchClicked(props.item)' min-width='320')
                v-card-title.pl-2
                  v-icon.mdi-36px(color='yellow') mdi-webhook
                  div.ml-2
                    div.title.mr-3 {{ props.item.matchType | enumTextById('matchTypes') }}
                    div.caption {{ props.item.dateTimeStamp | dateUTCToDate }} / {{ props.item.dateTimeStamp | dateUTCToTime }}
                  v-divider
                v-card-text
                  v-layout.justify-space-between
                    v-flex(xs12 layout column)
                      v-layout
                        v-flex(xs6)
                          v-btn.ma-0.mr-1(small icon)
                            flag(iso='ua')
                          span.subheading.pt-1 Artem Kolinko
                        v-flex.py-0(xs2)
                          v-chip.font-weight-bold.error--text(small label color='grey lighten-4') {{ props.item.scoreRed }}
                        v-flex.py-0(xs2)
                          v-progress-linear(:value='props.item.avgPointRed' color='accent' query)
                        v-flex.py-0(xs2)
                          v-chip.font-weight-bold.grey--text(small label color='transparent') {{ props.item.avgPointRed }}%
                      v-layout
                        v-flex(xs6)
                          v-btn.ma-0.mr-1(small icon)
                            flag(iso='gb')
                          span.subheading.pt-1 Jeid Tait
                        v-flex.py-0(xs2)
                          v-chip.font-weight-bold.primary--text(small label color='grey lighten-4') {{ props.item.scoreBlue }}
                        v-flex.py-0(xs2)
                          v-progress-linear(:value='props.item.avgPointRed' color='accent' query)
                        v-flex.py-0(xs2)
                          v-chip.font-weight-bold.grey--text(small label color='transparent') {{ props.item.avgPointRed }}%
                    // v-flex.justify-center.align-center(xs2 layout column)
                      v-btn(icon large @click='onMatchClicked(props.item)')
                        v-icon.mdi-36px(color='grey') mdi-chevron-right
                // v-divider
                v-card-actions.font-weight-medium
                  v-chip.mr-2.indigo--text(small label color='indigo lighten-5' v-if='props.item.competitionEvent') {{ props.item.competitionEvent | enumTextByIdFlatten('competitionEvents') }}
                  v-chip.cyan--text(small label color='cyan lighten-5' v-if='props.item.poolStage || props.item.eliminationStage')
                    // | {{ stageIndex }}

                // v-card-text(v-if="props.expanded")
                //   v-layout
                //     v-flex(xs6)
                //       v-icon.mdi-48px mdi-chevron-double-left
                //     v-flex(xs6)
                //       v-icon.mdi-48px mdi-chevron-double-right

      v-bottom-nav(
        :value='true'
        color='transparent'
        fixed
      )
        //- height='38'
        //- :active.sync='bottomNav'
        v-layout.justify-center
          //- div.text-xs-center
          v-pagination(
            light
            circle
            color='deep-orange'
            v-model='pagination.page'
            :length='pagination.totalPages'
          )

    div(v-else-if='currentMatch')
      Match(:match='currentMatch')
      v-bottom-nav(
        :value='true'
        color='transparent'
        fixed
      )
        //- height='38'
        //- :active.sync='bottomNav'
        v-layout.justify-center
          v-btn(@click='currentMatch = null')
            v-icon.mdi-36px(color='warning') mdi-reply
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ITournament, IMatch, IPagination } from 'types/interfaces' // eslint-disable-line
import { AsyncComputed } from '~/utils/decorators'
import GlobalMixins from '~/mixins/global'
import { pick, isEmptyObject } from '~/utils/helpers'

// import enums from '~/assets/enums'

@Component({
  components: {
    Match: () => import('~/components/Match.vue'),
    NoResults: () => import('~/components/NoResults.vue')
  },
  mixins: [GlobalMixins]
})
export default class MatchesPage extends Vue {
  currentMatch: IMatch | null = null
  rowsPerPageItems: Array<number> = [6, 12, 24, 36]
  pagination: IPagination = {
    page: 1,
    rowsPerPage: 6,
    sortBy: 'dateTimeStamp',
    descending: true,
    totalItems: 0,
    totalPages: 0
  }

  stageType (match: IMatch): string {
    if (!isEmptyObject(match)) {
      const { poolStage, eliminationStage } = match
      if (poolStage) return 'pool'
      else if (eliminationStage) return 'elimination'
    }
    return 'default'
  }

  // stageIndex (match: IMatch): string {
  //   if (!isEmptyObject(match)) {
  //     const { poolStage, eliminationStage } = match
  //   }
  // }

  @AsyncComputed({ default: [] })
  fetchedMatches (): IMatch[] {
    const {
      page: pageNumber,
      rowsPerPage: pageSize,
      sortBy,
      descending
    } = this.pagination

    const order = `${sortBy} ${descending ? 'DESC' : 'ASC'}`

    return this.$api.ApiMatchGet({ pageNumber, pageSize, order })
      .then(({ data }) => {
        const { items, itemCount, pageCount, pageNumber } = data
        if (pageNumber > pageCount) {
          this.pagination.page = pageCount || 1
        }
        this.pagination.totalItems = itemCount
        this.pagination.totalPages = pageCount

        const _items = items.map(x => pick(x, 'id', 'dateTimeStamp', 'matchType', 'competitionEvent', 'poolStage', 'eliminationStage', 'scoreRed', 'scoreBlue', 'appUserId', 'trainingId', 'tournamentId', 'matchToPlayers'))
        return _items
      })
  }

  fetchedTournament (id: string): Promise<ITournament> {
    // if (!this.guidRegex.test(id)) return {}

    return this.$api.ApiTournamentByIdGet({ id })
      .then(({ data }) => {
        const _item = pick(data, 'id', 'name')
        return _item
      })
      .catch((err) => { console.log(err) })
  }

  onMatchClicked (match: IMatch): void {
    this.currentMatch = match
  }
}
</script>

<style lang="stylus">
.flag-icon
  font-size 18px
  border-radius 50%
.rows-per-page
  width: 80px
// .v-toolbar__items
// .v-toolbar__content
.match
  justify-content: center
// .v-toolbar__title
  // width: 100%
.v-data-iterator
  > div
    display: flex
    flex-wrap: wrap
</style>
