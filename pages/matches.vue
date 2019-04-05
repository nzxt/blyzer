<template lang="pug">
v-layout
  NoResults(eventType='Match' v-if='!fetchedMatches.length')
  v-container.pa-1(fluid justify-start align-start v-else-if='!currentMatch')
    v-layout
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
              class='mb-2'
              color='indigo darken-5'
              dark
              flat
            )
              v-toolbar-title
                div.title Your Matches
                div.subheading Total matches: {{ pagination.totalItems }}
              v-spacer
              v-toolbar-items
                //- v-flex.mt-1
                  div.caption Row per page:
                v-select.mt-1(
                  dark
                  v-model='pagination.rowsPerPage'
                  :items='rowsPerPageItems'
                  label='Elements'
                )

          template(v-slot:item='props')
            v-flex(xs12 sm6 md4 lg3)
              v-card(@click='props.expanded = !props.expanded' @dblclick='onMatchClicked(props.item)')
                v-card-text.pa-1
                  v-layout
                    v-flex(xs2)
                      v-icon.mdi-24px(color='yellow') mdi-seal
                    v-flex(xs8)
                      div.body-2.font-weight-bold
                        span.mr-2 {{ props.item.matchType | enumTextById('matchTypes') }}
                        span.error--text {{ props.item.scoreRed }}
                        | &nbsp;:&nbsp;
                        span.primary--text {{ props.item.scoreBlue }}
                      div.caption Competition event: {{ props.item.competitionEvent | enumTextByIdFlatten('competitionEvents') }}
                      div.body-2 {{ props.item.dateTimeStamp | dateUTCToDate }} / {{ props.item.dateTimeStamp | dateUTCToTime }}
                    v-flex(xs2)
                      v-icon.mdi-48px mdi-chevron-right
                v-card-text(v-if="props.expanded")
                  v-layout
                    v-flex(xs6)
                    v-flex(xs6)

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
import { IMatch, IPagination } from 'types/interfaces' // eslint-disable-line
import { AsyncComputed } from '~/utils/decorators'
import { pick } from '~/utils/helpers'

@Component({
  components: {
    Match: () => import('~/components/Match.vue'),
    NoResults: () => import('~/components/NoResults.vue')
  }
})
export default class MatchesPage extends Vue {
  $api

  currentMatch: IMatch | null = null
  rowsPerPageItems: Array<number> = [10, 15, 25, 50, 100]
  pagination: IPagination = {
    page: 1,
    rowsPerPage: 50,
    sortBy: 'dateTimeStamp',
    descending: true,
    totalItems: 0,
    totalPages: 0
  }

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

  onMatchClicked (match: IMatch): void {
    this.currentMatch = match
  }
}
</script>

<style lang="stylus">
.v-toolbar__items
  width: 100px
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
