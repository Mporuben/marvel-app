<template>
  <ion-page>
    <ion-header>
      <ion-toolbar >
        <ion-searchbar @click="openSearchModal" v-model="$store.state.search.searchText"  class="ion-margin-top"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="heroes.length" >
        <HeroesList :heroes="heroes"/>
        <ion-item lines="none" v-if="$store.getters['search/areAllHeroesLoaded']">
          <ion-label class="ion-text-center" color="primary">All heroes are loaded</ion-label>
        </ion-item>
        <ion-infinite-scroll @ionInfinite="loadMoreHeroes($event)" >
          <ion-infinite-scroll-content loading-spinner="bubbles" />
        </ion-infinite-scroll>
      </div>
      <div v-else>
        <ion-item lines="none">
          <ion-label color="primary" class="ion-text-center">
            {{($store.getters['search/isSearchEmpty']) ? 'No results' : 'Search for hero name ☝️'}}
          </ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonSearchbar, modalController, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue'

import SearchModal from '@/plugins/search/SearchModal.vue'
import HeroesList from '@/plugins/hero/HeroesList.vue'

export default {
  components: { IonSearchbar, HeroesList, IonInfiniteScroll, IonInfiniteScrollContent },

  computed: {
    heroes() {
      return this.$store.state.search.heroes
    }
  },

  methods: {
    async openSearchModal() {
      const modal = await modalController.create({component: SearchModal})
      modal.present()
    },
    async loadMoreHeroes(ev) {
      await this.$store.dispatch('search/fetchHeroes')
      ev.target.complete()
    }
  },

}
</script>
