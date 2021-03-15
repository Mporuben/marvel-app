<template>
  <ion-page>
      
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="tabs/search" />
        </ion-buttons>

        <ion-title>{{detail?.name || 'Hero'}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
      <img v-if="detail?.thumbnail?.path"  :src="`${detail.thumbnail.path}/landscape_incredible.jpg`">      
      <div>
        <p v-if="detail?.description">
          {{detail?.description}}
        </p>
        
        <ion-item v-else lines="none">

          <ion-label color="primary"  class="ion-text-center">
            The hero has no description
          </ion-label>
        </ion-item>
      </div>

    </ion-content>


  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton } from '@ionic/vue';
import axios from 'axios';

export default  {

  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonBackButton },

    
  data() { return {
    detail: {},
  }},

  mounted() {
    this.fetchDetail()
  },

  methods: {
    async fetchDetail() {
      const id = this.$route.params.id

      try {
        const resp = await axios.get(`/v1/public/characters/${id}?apikey=${process.env.VUE_APP_MARVEL_API_KEY}`)
        this.detail = resp.data.data.results[0]
        
      } catch(err) { console.error(err) }


    }
  }



}
</script>