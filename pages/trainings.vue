<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      NoResults(eventType='Training' v-show='!pagination.totalPages')

      v-data-iterator(
        :items='fetchedTrainings'
        :rows-per-page-items='rowsPerPageItems'
        :pagination.sync='pagination'
        :total-items='pagination.totalItems'
        hide-actions
        v-show='pagination.totalPages'
      )
        //- content-class='training'
        template(v-slot:header)
          v-toolbar(
            color='secondary lighten-5'
            flat
          )
              v-toolbar-title
                span.headline.grey--text.text--darken-3 Trainings
                  v-chip.px-0(small dark color='cyan' style='padding:0 4px;margin-top:-10px;') {{ pagination.totalItems }}

              v-spacer

              v-toolbar-items.hidden-xs-only
                v-select.mt-1(
                  hide-details
                  v-model='pagination.rowsPerPage'
                  :items='rowsPerPageItems'
                  label='per page'
                  style='width:55px;'
                )

              v-spacer

              InitializeTrainingDialog

        template(v-slot:item='props')
          //- v-flex(d-inline-flex xs12 sm6 md4 lg3 style='min-width:320px;max-width:360px')
          //- v-flex(xs12 sm6 md4 lg3)
          v-card.ma-1(max-width='480' @click='onTrainingClicked(props.item)' style='min-width:304px;')
            v-card-title
              v-icon.mdi-24px(color='orange') {{ props.item.trainingType ? 'mdi-account-supervisor-circle' : 'mdi-google-earth' }}
              div.ml-2
                div.title.mr-3 {{ props.item.matchType | enumTextById('matchTypes') }}
                div
                  span.subheading {{ props.item.dateTimeStamp | dateUTCToDate }}
                  span.mx-2.body-2 {{ props.item.dateTimeStamp | dateUTCToTime }}
              v-divider
              v-icon.ml-1.mdi-24px(color='ssecondary') mdi-chevron-right

        //- template(v-slot:footer)
        //-   v-toolbar(
        //-     color='grey lighten-4'
        //-     dense
        //-     flat
        //-   )

      v-bottom-nav(
        :value='true'
        color='transparent'
        fixed
        v-if='pagination.totalPages > 1'
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
</template>

<script lang="ts">
import { Component, /* Watch, */ Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { AsyncComputed } from '~/utils/decorators'

import { ITraining, IPagination } from 'types/interfaces' // eslint-disable-line
import { pick } from '~/utils/helpers'

import * as trainingStore from '~/store/training'

const TrainingNS = namespace(trainingStore.name)
const { types } = trainingStore

@Component({
  components: {
    NoResults: () => import('~/components/NoResults.vue'),
    Statistics: () => import('~/components/training/Statistics.vue'),
    InitializeTrainingDialog: () => import('~/components/dialogs/InitializeTraining.vue')
  }
})
export default class TrainingsPage extends Vue {
  @TrainingNS.Mutation(types.SET_TRAINING) mutationSetTraining

  showDetails: object = {}
  rowsPerPageItems: Array<number> = [15, 25, 50]
  pagination: IPagination = {
    page: 1,
    rowsPerPage: 15,
    sortBy: 'dateTimeStamp',
    descending: true,
    totalItems: 0,
    totalPages: 0
  }

  onTrainingClicked (item: ITraining) {
    console.info(item)
    this.mutationSetTraining(item)
    this.$router.push('/training')
  }

  @AsyncComputed({ default: () => [] })
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
  .v-data-iterator
    div
      text-align -webkit-center
</style>
