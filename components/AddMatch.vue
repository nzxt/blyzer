<template lang="pug">
v-card
  v-card-title
    CircleLoader(
      :loading='true',
      color='#eee',
      :size='24',
      sizeUnit='px'
    )
  v-card-text
    v-container(pa-0, grid-list-md)
      v-layout(wrap)
        v-combobox(
          v-model='model'
          :items='items'
          :loading='isLoading'
          :search-input.sync='search'
          color='grey lighten-2'
          hide-no-data
          hide-selected
          item-text='Description'
          item-value='API'
          label='Tournament'
          placeholder='Чтооооооо?'
          prepend-icon='mdi-database-search'
          return-object
        )
        v-combobox(
          v-model='model'
          :items='items'
          :loading='isLoading'
          :search-input.sync='search'
          color='grey lighten-2'
          hide-no-data
          hide-selected
          item-text='Description'
          item-value='API'
          label='Competition'
          placeholder='Чтооооооо?'
          prepend-icon='mdi-database-search'
          return-object
        )
        v-combobox(
          v-model='model'
          :items='items'
          :loading='isLoading'
          :search-input.sync='search'
          color='grey lighten-2'
          hide-no-data
          hide-selected
          item-text='Description'
          item-value='API'
          label='Event'
          placeholder='Чтооооооо?'
          prepend-icon='mdi-database-search'
          return-object
        )

</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

@Component({})
export default class AddMatch extends Vue {
  descriptionLimit: Number = 60
  entries: Array<any> = []
  isLoading: Boolean = false
  model: any | null = null
  search: String | null = null

  get fetch () {
    if (!this.model) return []
    return Object.keys(this.model).map(key => ({
      key,
      value: this.model[key] || 'n/a'
    })
    )
  }

  get items () {
    return this.entries.map((entry) => {
      const Description = entry.Description.length > this.descriptionLimit
        ? entry.Description.slice(0, this.descriptionLimit) + '...'
        : entry.Description

      return Object.assign({}, entry, { Description })
    })
  }

  @Watch('search')
  onSearchChanged (val: String) {
    // Items have already been loaded
    if (this.items.length > 0) return

    // Items have already been requested
    if (this.isLoading) return

    this.isLoading = true

    // Lazily load input items
    fetch('https://api.publicapis.org/entries')
      .then(res => res.json())
      .then((res) => {
        const { count, entries } = res
        this.count = count
        this.entries = entries
      })
      .catch((err) => { console.log(err) })
      .finally(() => (this.isLoading = false))
  }
}
</script>
