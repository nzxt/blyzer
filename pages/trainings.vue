<template lang="pug">
v-flex(layout wrap xs12)
  NoResults(eventType='Training' v-if='!fetchedTrainings.length')
  v-container.pa-1(fluid justify-start align-start v-else)
    v-layout
      v-flex(xs12)
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
              class='mb-2'
              color='indigo darken-5'
              dark
              flat
            )
              v-toolbar-title
                div.title Your Trainings
                div.subheading Total trainings: {{ pagination.totalItems }}
              v-spacer
              v-toolbar-items
                //- v-flex.mt-1
                  div.caption Row per page:
                v-select.mt-1(
                  dark
                  v-model='pagination.rowsPerPage'
                  :items='rowsPerPageItems'
                  label='Rows per page'
                )

          template(v-slot:item='props')
            v-flex(xs12 sm6 md4 lg3)
              v-card
                v-card-text.pa-1
                  v-layout
                    v-flex(xs2)
                      v-icon.mdi-24px(color='yellow') mdi-triforce
                    v-flex(xs8)
                      div.subheading Date: {{ props.item.dateTimeStamp | dateUTCToDate }}
                      div.body-2 Time: {{ props.item.dateTimeStamp | dateUTCToTime }}
                    v-flex(xs2)
                      v-icon.mdi-48px mdi-chevron-right

      //- template(v-slot:footer)
        v-toolbar(
          class='mt-2'
          color='indigo'
          dark
          dense
          flat
        )
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
.v-toolbar__items
  width: 120px
// .v-toolbar__content
.training
  justify-content: center
// .v-toolbar__title
  // width: 100%
.v-data-iterator
  > div
    display: flex
    flex-wrap: wrap
</style>
