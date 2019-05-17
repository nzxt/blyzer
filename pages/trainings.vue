<template lang="pug">
  //- v-container.pa-0.grid-list-md
  v-layoutk
    //- NoResults(eventType='Training' v-if='!fetchedTrainings.length')
    v-data-iterator(
      :items='fetchedTrainings'
      :rows-per-page-items='rowsPerPageItems'
      :pagination.sync='pagination'
      :total-items='pagination.totalItems'
      content-class='training'
      hide-actions
    )
      template(v-slot:header)
        v-toolbar(
          color='secondary lighten-5'
          flat
        )
          v-toolbar-title
            span.headline.grey--text.text--darken-3 Trainings
            v-chip.px-0(small dark color='cyan' style='padding:0 4px;margin-top:-12px;') {{ pagination.totalItems }}
          v-spacer
          v-toolbar-items.hidden-xs-only
            v-select(
              hide-details
              v-model='pagination.rowsPerPage'
              :items='rowsPerPageItems'
              label='per page'
              style='width:55px;'
            )
          v-spacer
          v-btn(dark small round color='backpurple' @click='$router.push("/newTraining")')
            v-icon(left) mdi-plus-circle-outline
            | Add

      template(v-slot:item='props')
        v-flex(xs12 sm6 md4 lg3)
          v-card.my-1(@click='onTrainingClicked(props.item)' min-width='312')
            v-card-title.pl-2
              v-icon.mdi-36px(color='yellow') mdi-webhook
              div.ml-2
                div.title.mr-3 {{ props.item.matchType | enumTextById('matchTypes') }}
                div.caption {{ props.item.dateTimeStamp | dateUTCToDate }} / {{ props.item.dateTimeStamp | dateUTCToTime }}
              v-divider
            v-card-text.py-1
              v-layout.justify-space-between
                v-flex(xs12 layout column)
                  v-layout
                    v-flex(xs6)
                      v-btn.ma-0.mr-1(small icon)
                        flag(iso='ua')
                      span.subheading.pt-1 Athlete Name
                    v-flex.py-0(xs2)
                      v-chip.font-weight-bold.error--text(small label color='grey lighten-4') {{ props.item.scoreRed }}
                    v-flex.py-0(xs2)
                      v-progress-linear(:value='props.item.avgPointRed' color='accent' query)
                    v-flex.py-0(xs2)
                      v-chip.font-weight-bold.grey--text(small label color='transparent') {{ props.item.avgPointRed }}%

            v-card-actions.font-weight-medium
              v-chip.mr-2.indigo--text(small label color='indigo lighten-5' v-if='props.item.competitionEvent') {{ props.item.competitionEvent | enumTextByIdFlatten('competitionEvents') }}
              v-chip.cyan--text(small label color='cyan lighten-5' v-if='props.item.poolStage || props.item.eliminationStage')

      template(v-slot:footer)
        v-toolbar(
          color='grey lighten-4'
          dense
          flat
        )

    //- v-bottom-nav(
      :value='true'
      color='transparent'
      fixed
    //- )
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
    //- v-card(flat style='min-width:300px;')
      v-card-title.title.teal--text Your Trainings
      v-list(dense)
        v-list-tile.elevation-1.mb-1(v-for='training in fetchedTrainings' :key='training.id')
          v-list-tile-avatar
            v-icon.mdi-24px(color='grey') mdi-seal
          v-list-tile-content
            | {{ training.dateTimeStamp | dateUTCToDate }}
            | {{ training.dateTimeStamp | dateUTCToTime }}
          v-list-tile-action
            v-icon.mdi-24px mdi-chevron-right
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ITraining, IPagination } from 'types/interfaces' // eslint-disable-line
import { AsyncComputed } from '~/utils/decorators'
import { pick } from '~/utils/helpers'

@Component({
  components: {
    NoResults: () => import('~/components/NoResults.vue')
  }
})
export default class TrainingsPage extends Vue {
  $api

  rowsPerPageItems: Array<number> = [7, 15, 25]
  pagination: IPagination = {
    page: 1,
    rowsPerPage: 7,
    sortBy: 'dateTimeStamp',
    descending: true,
    totalItems: 0,
    totalPages: 0
  }

  onTrainingClicked (item: ITraining) {
    console.log(item)
  }

  @AsyncComputed({ default: [] })
  fetchedTrainings (): ITraining[] {
    const {
      page: pageNumber,
      rowsPerPage: pageSize,
      sortBy,
      descending
    } = this.pagination

    const order = `${sortBy} ${descending ? 'DESC' : 'ASC'}`

    return this.$api.ApiTrainingGet({ pageNumber, pageSize, order })
      .then(({ data }) => {
        const { items, itemCount, pageCount, pageNumber } = data
        if (pageNumber > pageCount) {
          this.pagination.page = pageCount || 1
        }
        this.pagination.totalItems = itemCount
        this.pagination.totalPages = pageCount

        const _items = items.map(x => pick(x, 'id', 'dateTimeStamp', 'appUserId'))
        return _items
      })
  }
}
</script>

<style lang="stylus">
.flag-icon
  font-size 22px
  border-radius 50%
// .v-toolbar
// .v-toolbar__items
  // width: 100px
.v-toolbar__content
  .v-chip .v-chip__content
    padding: 0 4px
  .v-chip--small
    height: 18px !important
// .training
//   justify-content: center
// .v-toolbar__title
  // width: 100%
// .v-data-iterator
  // > div
  //   display: flex
  //   flex-wrap: wrap
</style>
