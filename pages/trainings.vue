<template lang="pug">
  v-layout
    v-flex(xs12)
      NoResults(eventType='Training' v-show='!pagination.totalPages')
      v-data-iterator(
        :items='fetchedTrainings'
        :rows-per-page-items='rowsPerPageItems'
        :pagination.sync='pagination'
        :total-items='pagination.totalItems'
        content-class='training'
        hide-actions
        v-show='pagination.totalPages'
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
            InitializeTraining
            //- v-btn(dark small round color='backpurple' @click='$router.push("/training")')
            //-   v-icon(left) mdi-plus-circle-outline
            //-   | Add New

        template(v-slot:item='props')
          v-flex(xs12 sm6 md4 lg3)
            v-card.my-1(@click='onTrainingClicked(props.item)' min-width='312')
              v-card-title
                v-icon.mdi-24px(color='orange') {{ props.item.trainingType ? 'mdi-account-supervisor-circle' : 'mdi-google-earth' }}
                div.ml-2
                  div.title.mr-3 {{ props.item.matchType | enumTextById('matchTypes') }}
                  div
                    span.subheading {{ props.item.dateTimeStamp | dateUTCToDate }}
                    span.mx-2.body-2 {{ props.item.dateTimeStamp | dateUTCToTime }}
                v-divider
              //- v-card-text.py-1
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

              //- v-card-actions.font-weight-medium
              //-   v-chip.mr-2.indigo--text(small label color='indigo lighten-5' v-if='!props.item.trainingType') Individual Training
              //-   v-chip.cyan--text(small label color='cyan lighten-5' v-else) Training Match
              //-   v-spacer
              //-   v-btn(icon @click="showDetails = (showDetails === props.item.id) ? null : props.item.id")
              //-     v-icon(color='grey lighten-1') {{ showDetails === props.item.id ? 'mdi-progress-download' : 'mdi-progress-upload' }}

              //- v-slide-y-transition
              //-   v-card-text(v-show="showDetails === props.item.id")
              //-     Statistics(:trainingId='showDetails')

        template(v-slot:footer)
          v-toolbar(
            color='grey lighten-4'
            dense
            flat
          )

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
import { Component, Vue } from 'vue-property-decorator'
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
    InitializeTraining: () => import('~/components/dialogs/InitializeTraining.vue')
  }
})
export default class TrainingsPage extends Vue {
  @TrainingNS.Mutation(types.SET_TRAINING) mutationSetTraining

  showDetails: object = {}
  rowsPerPageItems: Array<number> = [10, 25, 50]
  pagination: IPagination = {
    page: 1,
    rowsPerPage: 10,
    sortBy: 'dateTimeStamp',
    descending: true,
    totalItems: 0,
    totalPages: 0
  }

  onTrainingClicked (item: ITraining) {
    console.log(item)
    this.mutationSetTraining(item)
    this.$router.push('/training')
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
.training
  justify-content: center
// .v-toolbar__title
  // width: 100%
.v-data-iterator
  > div.training
    display: flex
    flex-wrap: wrap
</style>
