<template>
  <ion-list v-if="heroes.length">
    <ion-item v-for="hero of heroes" :key="hero.id" lines="full" >
      <ion-avatar slot="start">
        <img :src="`${hero.thumbnail.path}/standard_small.jpg`">
      </ion-avatar>
      <ion-label>{{hero.name}}</ion-label>
      <ion-buttons>
        <ion-button @click="$router.push(`/hero/${hero.id}`)">
          <ion-icon :icon="chevronForward" />
        </ion-button>
        <ion-button @click="$store.dispatch('favorite/toggleFavourite', hero.id)">
          <ion-icon :icon="$store.getters['favorite/isHeroFavorite'](hero.id) ? heartDislike : heart" />
        </ion-button>
      </ion-buttons>
    </ion-item>
  </ion-list>
</template>


<script>
import { heartDislike, heart, chevronForward } from 'ionicons/icons';


export default {
  props:{
    heroes: {
      required: true
    }
  },

  setup(){return {
    heartDislike, heart, chevronForward
  }}
}
</script>
