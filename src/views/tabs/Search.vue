<template>
  <ion-page>

    <ion-header>
      <ion-toolbar >
        <ion-searchbar class="ion-margin-top"></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-list>
        
        <ion-item v-for="hero of heroes" :key="hero.id" lines="full">

          <ion-label @click="$router.push({name: ''})">{{hero.name}}</ion-label>

          <ion-buttons>
            <ion-button @click="$store.dispatch('heroes/toggleFavourite', hero.id)">
              <ion-icon :icon="$store.getters['heroes/isHeroFavorite'](hero.id) ? heartDislike : heart" />
            </ion-button>
          </ion-buttons>

        </ion-item>

      </ion-list>
      
    </ion-content>

  </ion-page>
</template>

<script >
import { IonPage, IonHeader, IonToolbar,  IonContent, IonSearchbar } from '@ionic/vue';

import { defineComponent } from '@vue/runtime-core';
import { heartDislike, heart } from 'ionicons/icons';

export default  defineComponent({
  components: { IonHeader, IonToolbar,  IonContent, IonPage,  IonSearchbar},

  mounted() {
    this.$store.dispatch('heroes/fetchHeroes')
  },

  computed: {
    heroes() {
      return this.$store.state.heroes.heroes
    }
  },


  setup() {
    return { heartDislike, heart }  
  }
})
</script>