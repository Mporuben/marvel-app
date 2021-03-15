<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My favorite heroes</ion-title>
        <ion-badge slot="end">
          {{favoriteHeroes.length}}
        </ion-badge>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <HeroesList v-if="favoriteHeroes.length" :heroes="favoriteHeroes"/>
      <div v-else>
        <ion-item lines="none">
          <ion-label color="primary" class="ion-text-center">You have 0 favorite heroes</ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonBadge } from '@ionic/vue'

import HeroesList from '@/plugins/hero/HeroesList.vue'

export default  {
  components: { IonBadge, HeroesList },

  computed: {
    favoriteHeroes() {
      return this.$store.state.favorite.heroes
    }
  },

  mounted() {
    this.$store.dispatch('favorite/fetchFavoriteHeroes')
  },

}
</script>
