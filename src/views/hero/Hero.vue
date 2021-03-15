<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/search" />
        </ion-buttons>
        <ion-title>{{detail?.name || 'Hero'}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="avatar" v-if="detail?.thumbnail?.path" :style="{backgroundImage: `url('${detail.thumbnail.path}/standard_amazing.jpg')`}" />
      <div>
        <p v-if="detail?.description" class="ion-padding-horizontal">{{detail?.description}}</p>
        <ion-item v-else lines="none">
          <ion-label color="primary"  class="ion-text-center">
            Hero has no description
          </ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonBackButton } from '@ionic/vue'
import axios from 'axios'

export default {
  components: { IonBackButton },

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


<style lang="sass" scoped>
#avatar
  width: 180px
  height: 180px
  border-radius: 50%
  background-position: center
  background-size: cover
  margin: 10px auto
  border: solid var(--ion-color-primary) 3px
</style>
