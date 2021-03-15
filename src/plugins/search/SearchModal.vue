<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="close">
          <ion-icon :icon="closeIcon" />
        </ion-button>
      </ion-buttons>
      <ion-searchbar v-model="searchText" />
      <ion-buttons slot="end">
        <ion-button @click="search">
          <ion-icon :icon="searchIcon" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content >
    <ion-list lines="full">
      <ion-item  v-for="(search, i) of lastSearches" :key="search">
        <ion-label @click="searchText = search">{{search}}</ion-label>
        <ion-buttons slot="end">
          <ion-button @click="removeSearch(i)">
            <ion-icon :icon="closeIcon" />
          </ion-button>
        </ion-buttons>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { modalController, IonSearchbar, alertController } from '@ionic/vue'
import {search as searchIcon, close as closeIcon} from 'ionicons/icons'

export default {
  components: { IonSearchbar  },

  data() { return {
    lastSearches: JSON.parse(localStorage.getItem('lastSearches')) || [],
    searchText: this.$store.state.search.searchText
  }},

  methods: {
    close() {
      modalController.dismiss()
    },

    async search() {
      if(!this.searchText.length) {
        const alert = await alertController.create({
          header: 'Error',
          message: 'Unable to search for empty phrase',
          buttons: ['Close']
        })
        return alert.present()
      }

      this.lastSearches.unshift(this.searchText)
      localStorage.setItem('lastSearches', JSON.stringify(this.lastSearches))

      this.$store.dispatch('search/findHeroesByName', this.searchText)
      modalController.dismiss()
    },

    removeSearch(index) {
      this.lastSearches.splice(index, 1)
      localStorage.setItem('lastSearches', JSON.stringify(this.lastSearches))
    }

  },


  setup(){
    return { searchIcon, closeIcon,}
  }
}

</script>
